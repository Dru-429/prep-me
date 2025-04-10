"use server"

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7 

export async function signUp(params: SignUpParams) {
    const { uid, name, email } = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();
        
        if (userRecord.exists) {
            return {
                success: false,
                message: 'User already ecists. PLease sign in instead'
            }
        }

        await db.collection('users').doc('uid').set({
            name, email
        })


    } catch (e : any) { 
        console.log('Error creating a user', e);

        if (e.code === "auth/email-already-exists") {   //Firebase error code
            return {
                success: false,
                message: 'This email is already in use.'
            }
        }

        return {
            success: false,
            message: 'Failed to create an account'
        } 
    }

}



export async function setSessionCookie(idTOken: string) {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idTOken, {
        expiresIn: ONE_WEEK * 1000,
    })

    cookieStore.set('session', sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'
    })

    cookieStore.set('session')
}