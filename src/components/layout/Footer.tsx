import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full px-10 py-6 grid grid-cols-2 bg-gray-200">
      <div>
        <Link href="/">
          <Image src={"/images/Logo.svg"} alt="Logo" height={32} width={160} />
        </Link>
        <p className="font-hanken text-neutral font-xs mt-4">
          © 2024 Project Archives. All rights reserved.
        </p>
      </div>
      <ul className="flex items-center gap-6 justify-self-end">
        <li className="font-hanken font-medium text-xs text-neutral">
          Privacy
        </li>
        <li className="font-hanken font-medium text-xs text-neutral">Terms</li>
        <li className="font-hanken font-medium text-xs text-neutral">
          Contact
        </li>
      </ul>
    </footer>
  );
}
