import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="w-full h-162 grid grid-cols-1 lg:grid-cols-2 justify-items-center items-center -z-10 bg-gray-100">
      <div className="pl-26">
        <h1 className="mb-4 bg-linear-90 from-primary to-green-300 bg-clip-text text-transparent text-3xl font-bold">
          Step Into Comfort
        </h1>
        <p className="mb-10 text-neutral text-sm w-148.75">
          Experience the perfect blend of minimalist aesthetics and everyday
          functionality. Footwear designed for the modern journey.
        </p>
        <div className="flex gap-4 items-center">
          <Link
            href="/catalog"
            className="px-4 py-4 font-hanken text-lg text-white font-bold rounded-md bg-linear-90 from-primary to-green-600"
          >
            SHOP NOW
          </Link>
          <Link href="/catalog" className="text-lg text-neutral underline">
            EXPLORE THE COLLECTION
          </Link>
        </div>
      </div>
      <div className="w-fit h-fit relative">
        <Image
          src={"/images/hero_image.png"}
          alt="Shoe"
          width={743}
          height={400}
          className="relative scale-130 z-10"
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4 z-1 h-80 w-150 rounded-full bg-gray-200 blur-3xl"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-2 h-100 w-100 rounded-full bg-gray-200/40 blur-3xl"></div>
      </div>
    </div>
  );
}
