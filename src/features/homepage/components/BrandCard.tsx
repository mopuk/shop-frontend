import Link from "next/link";

export default function BrandCard({ title }: { title: string }) {
  return (
    <Link
      href={`/catalog?brand=${title}`}
      className="bg-green-200 font-montserrat font-semibold text-neutral text-xl py-7 rounded-xl"
    >
      {title}
    </Link>
  );
}
