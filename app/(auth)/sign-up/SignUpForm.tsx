"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpUser } from "@/lib/actions/user.action";
import { signUpDefaultValues } from "@/lib/constants";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

function SignUpForm() {

    const [data, formAction] = useActionState(signUpUser, {success: false, message: ""})

    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/"

    const {pending} = useFormStatus()

  return <form action={formAction}>
    <input type="hidden" name="callbackUrl" value={callbackUrl} />
    <div className="space-y-6">
        <div>
            <Label className="mb-2" htmlFor="name">Name</Label>
            <Input id="name" name="name" type="text" required autoComplete="name" defaultValue={signUpDefaultValues.name} />
        </div>
        <div>
            <Label className="mb-2" htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" defaultValue={signUpDefaultValues.email} />
        </div>
        <div>
            <Label className="mb-2" htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required autoComplete="password" defaultValue={signUpDefaultValues.password} />
        </div>
        <div>
            <Label className="mb-2" htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" name="confirmPassword" type="password" required autoComplete="password" defaultValue={signUpDefaultValues.confirmPassword} />
        </div>
        <div>
            <Button disabled={pending}  className="w-full" variant="default">{pending ? "Submitting..." : "Sign Up" }</Button>
        </div>
        {data && !data.success && (
            <div className="text-center text-destructive ">
                {data.message}
            </div>
        ) }
        <div className="text-sm text-center text-muted-foreground">
            Already have an account? {" "}
            <Link href={"sign-in"} target="_self" >Sign In</Link>
            
        </div>
    </div>
  </form>;
}

export default SignUpForm;
