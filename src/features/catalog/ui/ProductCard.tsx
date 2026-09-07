import { ProductVariantWithProduct } from "@/src/entities/product/model/types";
import Image from "next/image";

export default function ProductCard({
  productVariant,
  onClick,
}: {
  productVariant: ProductVariantWithProduct;
  onClick: (slug: string, variantId: number) => void;
}) {
  const image = productVariant.images?.[0];
  const imageURL = image?.url
    ? process.env.NEXT_PUBLIC_BACKEND_API + "/static/images/" + image.url
    : "";
  return (
    <li
      key={productVariant.id}
      onClick={() => onClick(productVariant.product.slug, productVariant.id)}
      className="w-82 h-100 flex flex-col items-center gap-2 cursor-pointer bg-white shadow-md rounded-lg pb-4"
    >
      {imageURL ? (
        <Image
          src={imageURL}
          alt={image?.alt_text}
          width={328}
          height={280}
          className="mb-4"
          style={{ objectFit: "cover" }}
          unoptimized
        />
      ) : (
        <div className="w-full h-72 flex items-center justify-center from-neutral-100 to-neutral-200 bg-linear-to-b rounded-t-lg">
          Нет изображения
        </div>
      )}
      <div className="w-full flex justify-between px-4">
        <p className="font-montserrat text-sm text-black">
          {productVariant.product.name}
        </p>
        <h3 className="font-hanken text-sm text-primary">
          ${productVariant.variant_price}
        </h3>
      </div>
      <div className="w-full flex justify-between items-center px-4 mt-auto">
        <div className="font-hanken font-medium text-[16px]">
          {productVariant.product?.category?.name}
        </div>
        <div className="font-hanken font-medium text-[16px]">
          {productVariant.product?.brand?.name}
        </div>
      </div>
    </li>
  );
}
