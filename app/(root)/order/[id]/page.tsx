import { getOrderById } from "@/lib/actions/order.actions"
import { notFound } from "next/navigation"
import OrderDetailsTable from "../OrderDetailsTable"
import { ShippingAddress } from "@/types"
import { auth } from "@/auth"

export const metadata = {
    title: "Order Details"
}

async function OrderDetailsPage({params}: {params: {id: string}}) {
    const {id} = await params

    const order = await getOrderById(id)

    if(!order) notFound()

    const session = await auth()
  return (
    <>
        <OrderDetailsTable order={{
          ...order, shippingAddress: order.shippingAddress as ShippingAddress
        }}   paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"} isAdmin= {session?.user.role === "admin" || false} />
    </>
  )
}

export default OrderDetailsPage