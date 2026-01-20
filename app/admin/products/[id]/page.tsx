import ProductForm from "@/components/admin/ProductForm"
import { getProductById } from "@/lib/actions/procdut.action"
import { notFound } from "next/navigation"

export const metadata = {title : "Update Product"}

async function AdminProductUpdatePage({params} : {params: {id: string}}) {

    const {id} = await params

    const product = await getProductById(id)

    if(!product) return notFound()
    

  return (
    <div className="space-y-8 max-w-5xl mx-auto"> 
        <h1 className="h2-bold">Update Product</h1>
        <ProductForm type="Update" product={product} productId={product.id} />
    </div>
  )
}

export default AdminProductUpdatePage