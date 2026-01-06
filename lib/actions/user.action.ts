" use server"

import { email } from "zod"
import { singnInFormSchema } from "../constants/validators"
import { signIn, signOut } from "@/auth"
import { isRedirectError } from "next/dist/client/components/redirect-error"

//Sign in the user with credentials
export async function signInWithCredentials         (prevState, formData: FormData) {
    try {
        const user = singnInFormSchema.parse({
            email: formData.get("email"),
            password : formData.get("password")
        })

        await signIn("credentials", user)

        return {success : true , message: "Signed in successfully"}
    } catch (error) {
        if(isRedirectError(error)){
            throw error
        }
        return {success: false, message: "Invalid email or password"}
    }
}

//Sign user out 
export async function signOutUser() {
    await signOut()
}