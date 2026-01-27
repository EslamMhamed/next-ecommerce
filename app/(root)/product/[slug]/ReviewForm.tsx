"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createUpdateReview, getReviewByPoductId } from "@/lib/actions/review.action";
import { reviewFormDefaultValues } from "@/lib/constants";
import { insertReviewSchema } from "@/lib/constants/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { StarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

function ReviewForm({
  userId,
  productId,
  onReviewSubmitted,
}: {
  userId: string;
  productId: string;
  onReviewSubmitted: () => void;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof insertReviewSchema>>({
    resolver: zodResolver(insertReviewSchema),
    defaultValues: reviewFormDefaultValues,
  });

  async function handleOpenForm() {
    form.setValue("productId", productId)
    form.setValue("userId", userId)
    const review = await getReviewByPoductId({productId})
    if(review){
      form.setValue("title", review.title)
      form.setValue("rating", review.rating)
      form.setValue("description", review.description)
    }
    setOpen(true);
  }

  async function onSubmit(values:z.infer<typeof insertReviewSchema>) {
    const res = await createUpdateReview({...values,productId })

    if(!res.success){
      return toast("", {
        description: res.message
      })
    }

    setOpen(false) 

    onReviewSubmitted()
    toast("", {
      description: res.message
    })

  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={handleOpenForm} variant={"default"}>
        Write a Review
      </Button>
      <DialogHeader>
              <DialogTitle>write a Review</DialogTitle>
              <DialogDescription>
                Share your thoughts with other customer
              </DialogDescription>
            </DialogHeader>
      <DialogContent className="sm:max-w-105">
        <Form {...form}>
          <form method="post" onSubmit={form.handleSubmit(onSubmit)}>

            <div className="grid gap-4 py-4">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl >
                        <Input {...field} placeholder="Enter Title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl >
                        <Textarea {...field} placeholder="Enter Description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="rating"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <Select value={field.value? field.value.toString() : undefined} onValueChange={field.onChange} >
                        <FormControl>
                            <SelectTrigger className="w-full max-w-48" >
                                <SelectValue placeholder="Select a rating" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="mt-10">
                            {Array.from({length:5}).map((_,index)=>(
                                <SelectItem value={(index + 1).toString()} key={index}>
                                    {index+1}{" "}<StarIcon className="inline h-4 w-4" />
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter >
                <Button type="submit" size={"lg"} className="w-full" disabled={form.formState.isSubmitting} >
                    {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ReviewForm;
