import { notFound } from "next/navigation";
<<<<<<< Updated upstream:src/app/product/[productSlug]/[variantId]/page.tsx

import ProductClient from "@/src/features/product/components/ProductClient";
import { Product, ProductVariant } from "@/src/types.ts";
=======
<<<<<<< Updated upstream:app/product/[productSlug]/[variantId]/page.tsx
import { Product, ProductVariant } from "../../../catalog/components/CatalogList";
import ProductClient from "./components/ProductClient";
=======

import ProductClient from "@/src/features/product/components/ProductClient";
import { Product, ProductVariant } from "@/src/shared/lib/types";
>>>>>>> Stashed changes:src/app/product/[productSlug]/[variantId]/page.tsx
>>>>>>> Stashed changes:app/product/[productSlug]/[variantId]/page.tsx

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
<<<<<<< Updated upstream:src/app/product/[productSlug]/[variantId]/page.tsx
  console.log(product);
  const variant: ProductVariant | undefined = product?.variants.find(
=======

<<<<<<< Updated upstream:app/product/[productSlug]/[variantId]/page.tsx
  const variant: ProductVariant | undefined = product.variants.find(
>>>>>>> Stashed changes:app/product/[productSlug]/[variantId]/page.tsx
    (v) => v.id == Number(variantId),
=======
  const variant: ProductVariant | undefined = product?.variants.find(
    (v) => v.id === Number(variantId),
>>>>>>> Stashed changes:src/app/product/[productSlug]/[variantId]/page.tsx
  );

  if (!variant) return notFound();

  return <ProductClient product={product} variant={variant} />;
}
