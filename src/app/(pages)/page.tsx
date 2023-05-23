import { client } from "../../../sanity/lib/client";
import Product from "../components/Product";
import { ProductData } from "../types/types";
import Banner from "../components/Banner";

export default async function Home() {
  const products = await getProducts();
  return (
    <main>
      <Banner />
      <section className="products-container container">
        {products?.map((product: ProductData) => (
          <Product key={product._id} product={product} />
        ))}
      </section>
    </main>
  );
}

async function getProducts() {
  const res = await client.fetch('*[_type=="product"]');

  if (!res) {
    throw new Error("Failed to fetch data");
  }
  return res;
}
