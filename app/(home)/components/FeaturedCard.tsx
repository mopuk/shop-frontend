import Image from "next/image";

export default function FeaturedCard({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  return (
    <div className="bg-green-200 font-montserrat font-semibold text-neutral text-xl py-7 rounded-xl">
      <Image src={url} alt={title}></Image>
      {title}
    </div>
  );
}
