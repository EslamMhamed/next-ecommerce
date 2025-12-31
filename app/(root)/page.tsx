import ProductList from "@/components/shared/product/ProductList"
import sampleData from "@/db/sample-data"



function HomePage() {
  return (
    < >
      <ProductList data={sampleData.products} title="Newest Arrivals" limit={4} />
    </>
  )
}

export default HomePage