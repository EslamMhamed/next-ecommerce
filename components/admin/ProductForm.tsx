"use client";

import { productDefaultValues } from "@/lib/constants";
import {
  insertProductschema,
  updateProductSchema,
} from "@/lib/constants/validators";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form } from "../ui/form";

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
      type === "Update"
        ? zodResolver(updateProductSchema)
        : zodResolver(insertProductschema),
  });

  return (
    <>
      <Form {...form}>
        <form className="space-y-8" >
            <div className="flex flex-col md:flex-row gap-5">
                {/* name */}
                {/* slug */}
            </div>
            <div className="flex flex-col md:flex-row gap-5">
                {/* category */}
                {/* brand */}
            </div>
            <div className="flex flex-col md:flex-row gap-5">
                {/* price */}
                {/* stock */}
            </div>
            <div className="upload-field flex flex-col md:flex-row gap-5">
                {/* iamges */}
            </div>
            <div className="upload-field">
                {/* isFeatured */}
            </div>
            <div>
                {/* description */}
            </div>
            <div>
                {/* submit */}
            </div>
        </form>
      </Form>
    </>
  );
}

export default ProductForm;
