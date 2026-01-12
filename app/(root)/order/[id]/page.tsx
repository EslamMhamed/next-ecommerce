import { getOrderById } from "@/lib/actions/order.actions"
import { notFound } from "next/navigation"

export const metadata = {
    title: "Order Details"
}

async function OrderDetailsPage({params}: {params: {id: string}}) {
    const {id} = await params

    const order = await getOrderById(id)

    if(!order) notFound()
  return (
    <>
        Details
    </>
  )
}

export default OrderDetailsPage