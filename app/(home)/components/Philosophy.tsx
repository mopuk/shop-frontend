import Image from "next/image";

export default function Philosophy() {
  return (
    <div className="w-full flex items-center justify-center bg-gray-100 py-24">
      <div className="w-200 flex flex-col items-center justify-center gap-6">
        <Image src="/images/leaf.svg" alt="Leaf" width={25} height={25} />
        <h1 className="font-montserrat font-bold text-2xl">Our Philosophy</h1>
        <p className="w-full font-hanken text-neutral text-sm">
          We believe that high-quality footwear shouldn't be a luxury. MOXPOKE
          is dedicated to creating accessible, durable, and minimalist shoes
          that support your daily movement without the unnecessary noise of fast
          fashion.
        </p>
        <ul className="w-full grid grid-cols-3 mt-4">
          <li className="justify-self-start flex flex-col items-center justify-center gap-2">
            <Image
              src="/images/sustainability.svg"
              alt="Infinity"
              width={48}
              height={48}
            />
            <span className="font-hanken font-bold text-xs text-neutral">
              Sustainable
            </span>
          </li>
          <li className="flex flex-col items-center justify-center gap-2">
            <Image
              src="/images/universal_fit.svg"
              alt="Man with hands up"
              width={48}
              height={48}
            />
            <span className="font-hanken font-bold text-xs text-neutral">
              Universal fit
            </span>
          </li>
          <li className="justify-self-end flex flex-col items-center justify-center  gap-2">
            <Image
              src="/images/transparent_pricing.svg"
              alt="Listening man"
              width={48}
              height={48}
            />
            <span className="font-hanken font-bold text-xs text-neutral">
              Transparent pricing
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
