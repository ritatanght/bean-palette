import "./product.css";
import { ProductData } from "@/app/types/types";
import { client } from "../../../../../sanity/lib/client";
import { urlForImage } from "../../../../../sanity/lib/image";
import ProductImage from "@/app/components/ProductImage";
import ProductForm from "@/app/components/ProductForm";
import { PortableText, PortableTextComponents } from "@portabletext/react";

export default async function Page({ params }: { params: { slug: string } }) {
  const product: ProductData = await getProduct(params.slug);
  
  return (
    <main className="product-page-container container page-container">
      <ProductImage name={product.name} images={product.image} />
      <ProductForm product={product} />
      <div className="product__description">
        <PortableText value={product.description} components={components} />
      </div>
    </main>
  );
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="description__img"
        src={urlForImage(value).url()}
        alt="coffee cherries processing"
      />
    ),
  },
};

async function getProduct(slug: string) {
  const res = await client.fetch(
    `*[_type=="product" && slug.current=="${slug}"]`
  );
  if (!res) {
    throw new Error("Failed to fetch product details");
  }
  return res[0];
}
