import ProductList from "@/components/shared/product/ProductList"
import { getLatestProduts } from "@/lib/actions/procdut.action"



async function HomePage() {
  const latestProducts = await getLatestProduts()
  return (
    < >
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
    </>
  )
}

export default HomePage