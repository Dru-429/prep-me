"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-in" ? z.string().optional() : z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8),
    })
}

const AuthForm = ({ type } : { type: FormType }) => {
    const formSchema = authFormSchema(type)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "sign-up") {
                console.log("Sign up", values)
            } else{
                console.log("Sign in", values )
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
                            (
                                <p>Name</p>
                            )
                        }
                        <p>Email</p>
                        <p>Password</p>

                        <Button 
                            type="submit"
                        >
                            {isSignin ? "Sign In" : "Create an Account"}
                        </Button>

                        <p className="text-center">
                            {isSignin ? 'No aAccount yet?' : "Already have an Account ?" }

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