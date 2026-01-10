"use client";
import { Minus, ArrowRight, Loader } from "lucide-react";

import { Cart } from "@/types";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Link from "next/link";

function CartTable({ cart }: { cart?: Cart }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <h1 className="py-4 h2-bold ">Shopping cart</h1>
      {!cart || cart?.items.length === 0 ? (
        <div>
          Cart is empty. <Link href={"/"}>Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">table</div>
        </div>
      )}
    </>
  );
}

export default CartTable;
