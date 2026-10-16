import { ArrowRight, Dot, ImageOff } from "lucide-react";
import Link from "next/link";
import { OrderItemType } from "../model";

export default function OrderItemsList({ items }: { items: OrderItemType[] }) {
  if (!items) return;
  return (
    <div>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="bg-surface rounded-md flex gap-4 p-4 items-center"
          >
            <div className="bg-muted h-24 p-2 rounded-md shadow-sm flex flex-col justify-center items-center text-[12px] text-center">
              <ImageOff width={20} height={20} />
              Нет изображения
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <h4 className="font-montserrat font-medium">
                {item.product_name}
              </h4>
              <div className="flex gap-1 text-neutral">
                Количество: {item.quantity}{" "}
                <span>
                  <Dot className="stroke-black" />
                </span>{" "}
                {(item.price_paid * item.quantity).toLocaleString("ru-RU")} ₽
              </div>
            </div>
            <Link
              href={`/product/${item.variant.product.slug}?variant=${item.variant.id}`}
              className={`flex gap-2 items-center ml-auto w-fit h-fit rounded-md hover:text-gray-700 hover:underline text-neutral`}
            >
              Перейти к товару
              <ArrowRight width={16} height={16} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
