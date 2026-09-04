import ProductVariantClient from "@/src/features/product/components/ProductVariantClient";
import getProduct from "@/src/entities/product/api/getProduct";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ productSlug: string }>;
  searchParams: Promise<{ variant: string }>;
}) {
  const { productSlug } = await params;
  const { variant: variantId } = await searchParams;

  const productPageData = await getProduct(productSlug, variantId);

  return <ProductVariantClient data={productPageData} />;
}
