import Image from "next/image";
import Link from "next/link";

export default function FeaturedCard({
  title,
  slug,
  variant_id,
}: {
  title: string;
  image_url: string;
  slug: string;
  variant_id: number;
}) {
  return (
    <Link
      href={`/product/${slug}?variant=${variant_id}`}
      className="bg-green-200 font-montserrat font-semibold text-neutral text-xl py-7 rounded-xl flex items-center justify-center text-center"
    >
      {title}
    </Link>
  );
}
