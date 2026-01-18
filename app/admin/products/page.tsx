import Pagination from "@/components/shared/Pagination"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAllProducts } from "@/lib/actions/procdut.action"
import { formatId, formatterCurrency } from "@/lib/utils"
import Link from "next/link"


async function AdminProductsPage({searchParams}: {searchParams:{page: string, query: string, category: string}}) {

    const {category , page, query} = await searchParams

    const currentPage= Number(page) || 1
    const searchText = query || ""
    const selectedCategory  = category || ""

    const products = await getAllProducts({query:searchText, page:currentPage, category: selectedCategory})


  return (
    <div className="space-y-2">
        <div className="flex-between">
            <h1 className="b2-bold">
                Products
            </h1>
            <Button asChild variant="default">
                <Link href={'/admin/products/create'} >
                Create Product</Link>
            </Button>
        </div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>NAME</TableHead>
                    <TableHead className="text-right">PRICE</TableHead>
                    <TableHead>CATEGORY</TableHead>
                    <TableHead>STOCK</TableHead>
                    <TableHead>RATING</TableHead>
                    <TableHead className="w-25">ACTIONS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.data.map(product=> (
                    <TableRow key={product.id}>
                        <TableCell>
                            {formatId(product.id)}
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell className="text-right">{formatterCurrency(Number(product.price))}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>{Number(product.rating)}</TableCell>
                        <TableCell className="flex gap-1 ">
                            <Button asChild variant="outline" size="sm">
                                <Link href={`/admin/products/${product.id}`}>
                                Edit</Link>
                                {/* Delete */}
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        {products?.totalPages && products?.totalPages > 1 && <Pagination page={currentPage} totalPages={products.totalPages}  />}
    </div>
  )
}

export default AdminProductsPage