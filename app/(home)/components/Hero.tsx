import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="w-full h-162 grid grid-cols-1 lg:grid-cols-2 justify-items-center items-center -z-10 bg-linear-90 from-gray-800 via-gray-700 via-60% to-gray-500">
      <div className="pl-26">
        <h1 className="mb-4 bg-linear-90 from-green-400 to-green-300 bg-clip-text text-transparent text-3xl font-poppins font-bold">
          Step Into Your Best Style
        </h1>
        <h2 className="mb-6 text-white text-xl font-poppins">
          Premium Shoes for Every Journey
        </h2>
        <p className="mb-10 text-gray-400 text-sm font-inter w-148.75">
          From everyday essentials to statement sneakers, discover footwear that
          combines comfort, quality, and timeless design. Find the perfect pair
          for work, weekends, workouts, and everything in between.
        </p>
        <div className="flex gap-4 items-center">
          <button className="px-4 py-2 text-lg text-white font-bold font-poppins rounded-md bg-linear-90 from-green-400 to-green-300">
            SHOP NOW
          </button>
          <Link href="/" className="text-lg text-white font-poppins underline">
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
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4 z-1 h-80 w-150 rounded-full bg-gray-50 blur-3xl"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-2 h-100 w-100 rounded-full bg-gray-300/40 blur-3xl"></div>
      </div>
    </div>
  );
}
