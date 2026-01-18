import { getAllProducts } from "@/lib/actions/procdut.action"


async function AdminProductsPage({searchParams}: {searchParams:{page: string, query: string, category: string}}) {

    const {category , page, query} = searchParams

    const currentPage= Number(page) || 1
    const searchText = query || ""
    const selectedCategory  = category || ""

    const products = await getAllProducts({query:searchText, page:currentPage, category: selectedCategory})

    console.log(products)

  return (
    <div className="space-y-2">
        <div className="flex-between">
            <h1 className="b2-bold">
                Products
            </h1>
        </div>
    </div>
  )
}

export default AdminProductsPage