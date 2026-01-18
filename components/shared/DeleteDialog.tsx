"use client"

import { useState, useTransition } from "react"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { toast } from "sonner"

type DeleteDialogProps = {
    id: string, 
    action: (id:string)=> Promise<{success: boolean, message: string}>
}

function DeleteDialog({id, action}: DeleteDialogProps) {
    const [open , setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    function handleDeleteClick(){
        startTransition(async()=> {
            const res = await action(id)
            if(!res.success){
                toast("", {description: res.message})
            }else{
                setOpen(false)
                toast("", {description: res.message})
            }
        })
    }

    return(
    <AlertDialog open={open} onOpenChange={setOpen}  >
        <AlertDialogTrigger asChild>
            <Button size="sm" variant="destructive" className="ml-2" >
                Delete
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-md fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  ">
            <AlertDialogHeader  className="text-start">
                <AlertDialogTitle>
                    Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This action can not be undone
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex items-center justify-end">
                <AlertDialogCancel>
                    Cancel
                </AlertDialogCancel>
                <Button variant="destructive" size="sm" disabled={isPending} onClick={handleDeleteClick}>
                    {isPending? "Deleting..." : "Delete"}
                </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialog