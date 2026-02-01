import DealCountdown from "@/components/DealCountdown"
import IconBoxes from "@/components/IconBoxes"
import ProductCarousel from "@/components/shared/product/ProductCarousel"
import ProductList from "@/components/shared/product/ProductList"
import ViewAllProductsButton from "@/components/ViewAllProductsButton"
import { getFeaturedProducts, getLatestProduts } from "@/lib/actions/procdut.action"



async function HomePage() {
  const latestProducts = await getLatestProduts()
  const featuredProducts = await getFeaturedProducts()
  return (
    < >
    {featuredProducts.length > 0 && <ProductCarousel data={featuredProducts} />}
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
      <ViewAllProductsButton />
      <DealCountdown />
      <IconBoxes />
    </>
  )
}

export default HomePage