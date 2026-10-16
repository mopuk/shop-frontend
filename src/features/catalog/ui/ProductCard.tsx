import { COLOR_LABELS } from "@/src/entities/product/model";
import { ProductVariantWithProduct } from "@/src/entities/product/model/types";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  productVariant,
}: {
  productVariant: ProductVariantWithProduct;
}) {
  const image = productVariant.images?.[0];
  const imageURL = image?.url
    ? process.env.NEXT_PUBLIC_BACKEND_API + "/static/images/" + image.url
    : "";
  return (
    <li className="w-full list-none">
      <Link
        href={`/product/${productVariant.product.slug}?variant=${productVariant.id}`}
        className="group flex flex-col h-full bg-background rounded-xl border border-neutral/20 shadow-xs hover:shadow-md hover:border-neutral/40 transition-all duration-200 overflow-hidden"
      >
        <div className="relative w-full h-48 bg-tertiary flex flex-col items-center justify-center border-b border-neutral/10">
          {imageURL ? (
            <Image src={imageURL} height={192} alt={image?.alt_text} />
          ) : (
            <>
              <div
                className="w-20 h-20 rounded-full shadow-inner border border-secondary/10 transition-transform duration-200 group-hover:scale-105"
                style={{ backgroundColor: productVariant.color.hex_code }}
              />

              <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-neutral text-xs font-montserrat">
                <ImageOff className="w-4 h-4 stroke-[1.5]" />
                <span>Превью цвета</span>
              </div>
            </>
          )}
          {productVariant.size && (
            <span className="absolute top-3 right-3 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded-md bg-background border border-neutral/20 text-secondary shadow-2xs font-montserrat">
              {productVariant.size.name}
            </span>
          )}
        </div>

        <div className="flex flex-col flex-1 p-4 gap-3">
          <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-neutral font-hanken">
            <span>{productVariant.product.category?.name ?? "Каталог"}</span>
            <span>{productVariant.product.brand?.name}</span>
          </div>

          <h3 className="font-montserrat font-medium text-xs text-secondary line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {productVariant.product.name}
          </h3>

          <div className="flex items-center gap-2 pt-1 font-montserrat">
            <span
              className="w-3.5 h-3.5 rounded-full border border-secondary/15 shrink-0"
              style={{ backgroundColor: productVariant.color.hex_code }}
              aria-hidden="true"
            />
            <span className="text-xs text-secondary truncate font-medium">
              {COLOR_LABELS[productVariant.color.slug]}
            </span>
            {productVariant.size && (
              <>
                <span className="text-neutral/40">•</span>
                <span className="text-xs text-neutral font-medium">
                  Размер: {productVariant.size.name}
                </span>
              </>
            )}
          </div>

          <div className="mt-auto pt-3 border-t border-neutral/10 flex items-center justify-between">
            <span className="text-xs text-neutral font-medium font-montserrat">
              Цена
            </span>
            <span className="font-hanken font-bold text-sm text-primary">
              {productVariant.variant_price.toLocaleString("ru-RU")} ₽
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
