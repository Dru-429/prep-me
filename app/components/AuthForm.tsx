"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Form } from "@/components/ui/form"
import FormField from "./FormField"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth'
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-in" ? z.string().optional() : z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8),
    })
}

const AuthForm = ({ type }: { type: FormType }) => {
    const formSchema = authFormSchema(type)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    async function  onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "sign-up") {
                const { name, email, password } = values

                const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

                const result = await signUp({
                    uid: userCredentials.user.uid,
                    name: name!,
                    email,
                    password
                })

                if (!result?.success) {
                    toast.error(result?.message)
                    return
                }

                console.log("Creating account", values)
                toast.success("Account created successfully. Please sign in")
                router.push("/sign-in")
            } else {
                const { email, password } = values;

                const userCredentials = await signInWithEmailAndPassword(auth, email, password)

                const idToken = await userCredentials.user.getIdToken()

                if(!idToken) {
                    toast.error('Sign in failed')
                    return
                }

                await signIn({
                    email, idToken
                })

                toast.success("Logged in successfully.")
                router.push("/")
            }
        } catch (error) {
            console.log(error)
            toast.error(`There was an error ${error}`)
        }
    }

    const isSignin = type === "sign-in"

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image
                        src="/logo.svg"
                        alt="logo"
                        height={32}
                        width={38}
                    />
                    <h2 className="text-primary-100 ">PrepMe</h2>
                </div>

                <h3>
                    Prepare with AI for your next interview
                </h3>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 w-full mt-4 form"
                    >
                        {!isSignin &&
                            <FormField
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder="Your name..."
                            />
                        }

                        <FormField
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="Your Email..."
                            type="email"
                        />

                        <FormField
                            control={form.control}
                            name="passwod"
                            label="Password"
                            placeholder="Your password..."
                            type="password"
                        />

                        <Button className="btn" type="submit">
                            {isSignin ? "Sign In" : "Create an Account"}
                        </Button>

                        <p className="text-center">
                            {isSignin ? 'No Account yet? ' : "Already have an Account ? "}

                            <Link
                                className="text-user-primary ml-1 font-bold"
                                href={!isSignin ? '/sign-in' : '/sign-up'}
                            >
                                {isSignin ? "Sign up" : "Sign in"}
                            </Link>
                        </p>

                    </form>
                </Form>
            </div>
        </div>
    )
}

export default AuthForm