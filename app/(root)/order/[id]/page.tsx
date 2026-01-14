import { getOrderById } from "@/lib/actions/order.actions"
import { notFound } from "next/navigation"
import OrderDetailsTable from "../OrderDetailsTable"
import { ShippingAddress } from "@/types"

export const metadata = {
    title: "Order Details"
}

async function OrderDetailsPage({params}: {params: {id: string}}) {
    const {id} = await params

    const order = await getOrderById(id)

    if(!order) notFound()
  return (
    <>
        <OrderDetailsTable order={{
          ...order, shippingAddress: order.shippingAddress as ShippingAddress
        }}   paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"} />
    </>
  )
}

export default OrderDetailsPage