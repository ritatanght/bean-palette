import { client } from "../../../sanity/lib/client";
import Banner from "../components/Banner";
import ProductList from "../components/ProductList";

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <Banner />
      <ProductList products={products} />
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
