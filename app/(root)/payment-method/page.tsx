import { auth } from "@/auth"
import { getUserById } from "@/lib/actions/user.action"
import PaymentMethodForm from "./PaymentMethodForm"
import CheckoutSteps from "@/components/shared/CheckoutSteps"

export const metadata = {
    title: "Select Payment Method"
} 


async function PaymentMethodPage() {
    const session = await auth()
    const userId = session?.user?.id

    if(!userId) throw new Error("User not found")
    
    const user = await getUserById(userId)

  return (
    <>
        <CheckoutSteps current={2} />
        <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
    </>
  )
}

export default PaymentMethodPage