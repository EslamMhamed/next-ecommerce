"use client";

import { productDefaultValues } from "@/lib/constants";
import {
  insertProductschema,
  updateProductSchema,
} from "@/lib/constants/validators";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import  slugify  from "slugify";
import { Textarea } from "../ui/textarea";
import { createProduct, updateProduct } from "@/lib/actions/procdut.action";
import { toast } from "sonner";

function ProductForm({
  type,
  product,
  productId,
}: {
  type: "Create" | "Update";
  product?: Product;
  productId?: string;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof insertProductschema>>({
    defaultValues:
      product && type === "Update" ? product : productDefaultValues,
    resolver:
      type === 'Update'
        ? zodResolver(updateProductSchema)
        : zodResolver(insertProductschema),
  });

  async function onSubmit(values: z.infer<typeof insertProductschema>){
    // On create

    if(type === "Create"){
      const res =await createProduct(values)
      if(!res.success){
        toast("", {description:res.message})
      }else{
        toast("",{description: res.message})
        router.push(`/admin/products`)
      }
    }

    // On update
    if(type === "Update"){
      if(!productId){
        router.push(`/admin/products`)
        return;
      }
      const data = {...values, id: productId}
      const res =await updateProduct(
        data
      )
      if(!res.success){
        toast("", {description:res.message})
      }else{
        toast("",{description: res.message})
        router.push(`/admin/proucts`)
      }
    }
  }

  return (
    <>
      <Form {...form}>
        <form method="POST" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >
            <div className="flex flex-col md:flex-row gap-5">
              {/* Name */}
                <FormField name="name" control={form.control} render={({field}:{field: ControllerRenderProps<z.infer<typeof insertProductschema>, "name">})=> (
                  <FormItem className="w-full   " >
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                {/* Slug */}
                <FormField name="slug" control={form.control} render={({field}:{field: ControllerRenderProps<z.infer<typeof insertProductschema>, "slug">})=> (
                  <FormItem className="w-full " >
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <div className="flex gap-3  ">
                        <Input placeholder="Enter slug" {...field} />
                        <Button onClick={()=> {
                          form.setValue("slug", slugify(form.getValues("name"),{lower:true}))
                        }} type="button">Generate</Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>
            <div className="flex flex-col md:flex-row gap-5">
                {/* category */}
                <FormField name="category" control={form.control} render={({field}:{field: ControllerRenderProps<z.infer<typeof insertProductschema>, "category">})=> (
                  <FormItem className="w-full " >
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                {/* brand */}
                <FormField name="brand" control={form.control} render={({field}:{field: ControllerRenderProps<z.infer<typeof insertProductschema>, "brand">})=> (
                  <FormItem className="w-full " >
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter brand" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>
            <div className="flex flex-col md:flex-row gap-5">
                {/* price */}
                <FormField name="price" control={form.control} render={({field}:{field: ControllerRenderProps<z.infer<typeof insertProductschema>, "price">})=> (
                  <FormItem className="w-full " >
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                {/* stock */}
                <FormField name="stock" control={form.control} render={({field}:{field: ControllerRenderProps<z.infer<typeof insertProductschema>, "stock">})=> (
                  <FormItem className="w-full " >
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter stock" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>
            <div className="upload-field flex flex-col md:flex-row gap-5">
                {/* iamges */}
            </div>
            <div className="upload-field">
                {/* isFeatured */}
            </div>
            <div>
                {/* description */}
                <FormField name="description" control={form.control} render={({field}:{field: ControllerRenderProps<z.infer<typeof insertProductschema>, "description">})=> (
                  <FormItem className="w-full " >
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" placeholder="Enter product description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>
            <div>
                {/* submit */}
                <Button type="submit" className="button col-span-2 w-full" size="lg" disabled={form.formState.isSubmitting} >
                  {form.formState.isSubmitting? "Submitting" : `${type} product`}
                </Button>
            </div>
        </form>
      </Form>
    </>
  );
}

export default ProductForm;
