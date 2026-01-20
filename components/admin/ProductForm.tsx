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
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { Checkbox } from "../ui/checkbox";

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

  const images = form.watch("images")
  const isFeatured = form.watch("isFeatured")
  const banner = form.watch("banner")

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
                {/* images */}
                 <FormField name="images" control={form.control} render={()=> (
                  <FormItem className="w-full   " >
                    <FormLabel>Images</FormLabel>
                    <div>
                      <Card >
                        <CardContent className="space-y-2 min-h-10 ">
                          <div className="flex-start space-x-2">
                            {images.map((image : string)=>(
                              <Image  key={image} src={image} alt="product iamge" className="w-20 h-20 object-cover object-center rounded-sm" width={100} height={100} />
                            ))}
                            <FormControl>
                              <UploadButton endpoint= "imageUploader" onClientUploadComplete={(res: {url: string}[])=> {
                                form.setValue("images", [...images, res[0].url])
                              }} onUploadError={(error: Error)=>{ 
                                toast("" , {
                                  description: `Error! ${error.message}`
                                })}
                              } />
                            </FormControl>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>
            <div className="upload-field">
                {/* isFeatured */}
                Featured Product
                <Card>
                  <CardContent className="space-y-2 mt-2">
                    <FormField  control={form.control} name="isFeatured" render={({field})=>(
                      <FormItem className=" flex space-x-2 items-center">
                        <FormControl >
                          <Checkbox checked={field.value } onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Is Featured?</FormLabel>
                        <FormMessage/>
                      </FormItem>
                    )} />
                    {isFeatured && banner && (
                      <Image src={banner} alt="banner image" className="w-full object-cover object-center rounded-sm" width={1920} height={680} />
                    )}

                    {isFeatured && !banner && (
                     <UploadButton endpoint= "imageUploader" onClientUploadComplete={(res: {url: string}[])=> {
                                form.setValue("banner", res[0].url)
                              }} onUploadError={(error: Error)=>{ 
                                toast("" , {
                                  description: `Error! ${error.message}`
                                })}
                              } />
                    )}
                  </CardContent>
                </Card>
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
