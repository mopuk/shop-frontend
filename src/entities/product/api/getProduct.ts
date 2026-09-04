import { notFound } from "next/navigation";
import { ProductPageData, ProductWithVariants } from "../model/types";

export default async function getProduct(
  productSlug: string,
  variantId: string,
): Promise<ProductPageData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/products/${encodeURIComponent(productSlug)}`,
  );

  if (!res.ok) return notFound();

  const product: ProductWithVariants = await res.json();

  const selectedVariant = product.variants.find(
    (v) => v.id === Number(variantId),
  );

  if (!selectedVariant) return notFound();

  const variants = product.variants;

  return { product, variants, selectedVariant };
}
