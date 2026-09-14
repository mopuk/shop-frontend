import { CartItem } from "@/src/entities/cart/model/types";
import Image from "next/image";
import Link from "next/link";

export default function CartItemCard({
  key,
  item,
}: {
  key: number;
  item: CartItem;
}) {
  return (
    <div key={key}>
      {item.variant.thumbnail ? (
        <Image
          src={item.variant.thumbnail}
          width={150}
          height={200}
          alt={item.variant.product.name}
        />
      ) : (
        <div className="w-37.5 h-50 flex justify-center items-center from-neutral-100 to-neutral-200 bg-linear-to-b rounded-t-lg">
          Нет изображения
        </div>
      )}
      <Link
        href={`product/${item.variant.product.slug}?variant=${item.variant.id}`}
      >
        <h2>{item.variant.product.name}</h2>
      </Link>
      <h3>
        {item.variant.variant_price}{" "}
        {item.variant.variant_price != Number(item.price_at_addition) && (
          <del>{item.price_at_addition}</del>
        )}
      </h3>
    </div>
  );
}
