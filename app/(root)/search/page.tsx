import ProductCard from "@/components/shared/product/ProductCard";
import { getAllProducts } from "@/lib/actions/procdut.action";

async function SearchPage({
  searchParams,
}: {
  searchParams: {
    q?: string;
    category?: string;
    price?: string;
    sort?: string;
    rating?: string;
    page?: string;
  };
}) {
  const {
    category = "all",
    page = "1",
    q = "all",
    price,
    rating = "all",
    sort = "newest",
  } = await searchParams;

  const products = await getAllProducts({
    query: q,
    category,
    page: Number(page),
    price,
    sort,
    rating,
  });

  return <div className="grid md:grid-cols-5 md:gap-5">
    <div className="filter-links">
      {/* Filter */}
    </div>
      <div className="space-y-4 md:col-span-4 ">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.data.length === 0 && <div>No products found</div>}
          {products.data.map(product=> (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
  </div>;
}

export default SearchPage;
