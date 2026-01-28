import { Button } from "@/components/ui/button"
import { getOrderById } from "@/lib/actions/order.actions"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import Stripe from "stripe"

    const stripe = new Stripe(process.env.STRIP_SECRET_KEY as string)

async function SuccessPage({params, searchParams}: {params: {id: string}, searchParams: {payment_intent: string}}) {

    const {id} = await params
    const {payment_intent: paymentIntentId} = await searchParams

    // Fetch order
    const order = await getOrderById(id)
    if(!order) notFound()
    
    // Retrieve payment
    const pyamentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    // Check if patment intent is valid
    if(pyamentIntent.metadata.orderId == null || pyamentIntent.metadata.orderId !== order.id.toString()){
      return notFound()
    }

    // Check if payment is successful
    const isSuccess = pyamentIntent.status === "succeeded"

    if(!isSuccess)  redirect(`/order/${id}`)

    

  return (
    <div className="max-w-4xl w-full mx-auto space-y-8">
      <div className="flex flex-col gap-6 items-center">
        <h1 className="h1-bold">
          Thanks for your purchase
        </h1>
        <div>We are processing your order.</div>
        <Button asChild>
          <Link href={`/order/${id}`} >View Order</Link>
        </Button>
      </div>
    </div>
  )
}

export default SuccessPage