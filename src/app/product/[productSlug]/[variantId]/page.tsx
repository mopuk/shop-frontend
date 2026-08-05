import { notFound } from "next/navigation";

import ProductClient from "@/src/features/product/components/ProductClient";
import { Product, ProductVariant } from "@/src/types.ts";

export default async function Page({
  params,
}: {
  params: { productSlug: string; variantId: string };
}) {
  const { productSlug, variantId } = await params;

  const res = await fetch(`
    ${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/products/${productSlug}
  `);

  if (!res.ok) return notFound();

  const { product }: { product: Product } = await res.json();
  console.log(product);
  const variant: ProductVariant | undefined = product?.variants.find(
    (v) => v.id == Number(variantId),
  );

  if (!variant) return notFound();

  return <ProductClient product={product} variant={variant} />;
}
