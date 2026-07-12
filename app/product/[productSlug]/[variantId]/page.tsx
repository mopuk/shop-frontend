import { notFound } from "next/navigation";
import { Product, ProductVariant } from "../../../catalog/components/CatalogList";
import ProductClient from "./components/ProductClient";

export default async function Page({
  params,
}: {
  params: { productSlug: string; variantId: string };
}) {
  const { productSlug, variantId } = await params;

  const res = await fetch(`
    ${process.env.BACKEND_URL}/api/v1/products/${productSlug}
  `);

  if (!res.ok) return notFound();

  const { product }: { product: Product } = await res.json();

  const variant: ProductVariant | undefined = product.variants.find(
    (v) => v.id == Number(variantId),
  );

  if (!variant) return notFound();

  return <ProductClient product={product} variant={variant} />;
}
