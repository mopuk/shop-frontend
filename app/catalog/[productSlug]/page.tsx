import { notFound } from "next/navigation";
import { ProductVariant } from "../../../components/CatalogList";
import Image from "next/image";

export default async function page(params: {
  params: { productSlug: string };
}) {
  const { productSlug } = params;

  const res = await fetch(
    process.env.BACKEND_URL + "/api/products/" + productSlug,
  );

  if (!res.ok) return notFound();

  const product: ProductVariant = await res.json();
  return (
    <div>
      <div>
        <Image
          href={product.images[0].url}
          alt={product.images[0].alt_text}
          width={300}
          height={400}
        ></Image>
        <div
          className={`bg-[${product.color.hex_code}] borders-full w-4 h-4`}
        ></div>
      </div>
    </div>
  );
}
