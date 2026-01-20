"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { USER_ROLES } from "@/lib/constants"
import { updateUserSchema } from "@/lib/constants/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { ControllerRenderProps, useForm } from "react-hook-form"
import z from "zod"


function UpdateUserForm({user}: {user:z.infer<typeof updateUserSchema>}) {

    const router = useRouter()

    const form = useForm<z.infer<typeof updateUserSchema>>({
        defaultValues: user,
        resolver: zodResolver(updateUserSchema)
    })

    function onSubmit(){
        return ;
    }

  return (
    <Form {...form} >
        <form method="POST" onSubmit={form.handleSubmit(onSubmit)} className="space-y-3" >
            {/* Email */}
            <div>
                <FormField control={form.control} name="email" render={({field}:{field: ControllerRenderProps<z.infer<typeof updateUserSchema>, "email">})=> (
                <FormItem className="w-full">
                    <FormLabel >Email</FormLabel>
                    <FormControl >
                        <Input disabled={true} {...field} placeholder="Enter user email"  />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            </div>
            {/* name */}
            <div>
                <FormField control={form.control} name="name" render={({field}:{field: ControllerRenderProps<z.infer<typeof updateUserSchema>, "name">})=> (
                <FormItem className="w-full">
                    <FormLabel >Name</FormLabel>
                    <FormControl >
                        <Input  {...field} placeholder="Enter user name"  />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            </div>
            {/* role */}
            <div>
                <FormField control={form.control} name="role" render={({field}:{field: ControllerRenderProps<z.infer<typeof updateUserSchema>, "role">})=> (
                <FormItem className="w-full">
                    <FormLabel >Role</FormLabel>
                    <FormControl >
                        <Select onValueChange={field.onChange} value={field.value.toString()}>
                            <SelectTrigger >
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent >
                                {USER_ROLES.map(role=> (
                                    <SelectItem key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            </div>
            <div className="flex-between">
                <Button type="submit"  className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Submitting..." : "Update User"}
                </Button>
            </div>
        </form>
    </Form>
  )
}

export default UpdateUserForm