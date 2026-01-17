import { DefaultSession } from "next-auth"

declare module "next-auth" {
    export type Session = {
        user:{
            role : string
        } & DefaultSession["user"]
    }
}