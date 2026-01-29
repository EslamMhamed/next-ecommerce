import {Body, Column, Container, Head, Heading, Html, Img, Preview, Row, Section, Tailwind, Text} from "@react-email/components"
import { Order } from "@/types"
import { formatterCurrency } from "@/lib/utils"
import sampleData from "@/db/sample-data"


PurchaseReceiptEmail.PreviewProps = {
    order: {
        id: crypto.randomUUID(),
        userId: "1234",
        user: {
            name : "Eslam Mohamed",
            email: "test@test.com"
        },
        paymentMethod: "Stripe",
        shippingAddress: {
            fullName: "Eslam Mohamed",
            streetAddress: "134 Main st",
            city: "Qena",
            postalCode: "10012",
            country: "Egypt"
        },
        createdAt: new Date(),
        totalPrice:"100",
        taxPrice: "10",
        shippingPrice: "10",
        itemsPrice: "80",
        orderItem: sampleData.products.map(x=> ({
            name: x.name,
            orderId: "132",
            productId: "134",
            slug: x.slug,
            qty: x.stock,
            image: x.images[0],
            price: x.price.toString()
        })),
        isDelivered: true,
        deliveredAt: new Date(),
        isPaid: true,
        paidAt:new Date(),
        paymentResult: {
            id: "132",
            status: "succeeded",
            pricePaid: "100",
            email_address: "test@test.com"
        }
    }
} satisfies OederInfomationProps

const dateFormatter = new Intl.DateTimeFormat("en", {dateStyle:"medium"})

    type OederInfomationProps = {
        order: Order
    }

export default function PurchaseReceiptEmail({order}: {order:OederInfomationProps}) {


  return (
    <Html>
        <Preview >View order receipt</Preview>
        <Tailwind>
            <Head/>
            <Body className="font-sans bg-white">
                <Container className="max-w-xl">
                    <Heading>Purchase Receip</Heading>
                    <Section>
                        <Row>
                            <Column>
                                <Text className="mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap">
                                    Order Id 
                                </Text>
                                <Text className="mt-0 mr-4 ">{order.id.toString()}</Text>
                            </Column>
                            <Column>
                                <Text className="mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap">
                                    Purchase Date 
                                </Text>
                                <Text className="mt-0 mr-4 ">{dateFormatter.format(order.createdAt)}</Text>
                            </Column>
                            <Column>
                                <Text className="mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap">
                                    Price Paid 
                                </Text>
                                <Text className="mt-0 mr-4 ">{formatterCurrency(order.totalPrice)}</Text>
                            </Column>
                        </Row>
                    </Section>
                    <Section className="border border-solid border-gray-500 rounded-lg p-4 md:p6 my-4">
                        {order.orderItem.map(item=> (
                            <Row key={item.productId} className="mt-8">
                                <Column className="w-20">
                                    <Img width="80" alt={item.name} className="rounded" src={item.image.startsWith("/") ? `${process.env.NEXT_PUBLIC_SERVER_URL}${item.image}` : item.image} />
                                </Column>
                                <Column className="align-top">
                                {item.name} x {item.qty}</Column>
                                <Column align="right" className="align-top">
                                {formatterCurrency(item.price)}</Column>

                            </Row>
                        ))}
                        {[
                            {name: "Items", price:order.itemsPrice},
                            {name: "Tax", price:order.taxPrice},
                            {name: "Shipping", price:order.shippingPrice},
                            {name: "Total", price:order.totalPrice},
                        ].map(({name, price})=>(
                            <Row key={name} className="py-1">
                                <Column align="right">
                                {name}:</Column>
                                <Column align="right" width={70} className="align-top">
                                <Text className="m-0" >{formatterCurrency(price)}</Text>
                            </Column>
                            </Row>
                        ))}
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
  )
}

