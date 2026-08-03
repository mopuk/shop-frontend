import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Ghost } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center w-full py-4 px-4">
      <nav className="w-screen flex justify-between items-center">
        <Link href="/">
          <Image src={"/images/Logo.svg"} alt="Logo" height={32} width={160} />
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/catalog">CATALOG</Link>
          <Link href="/brands">BRANDS</Link>
          <div className="h-full w-0.5 bg-gray-300"></div>
          <Button variant={"ghost"}>
            <Image
              src={"/images/search.png"}
              alt="Search button"
              width={16}
              height={20}
            ></Image>
          </Button>
          <Link href="/cart" className="flex flex-1 justify-end">
            <Button variant={"ghost"}>
              <Image
                src={"/images/cart.png"}
                alt="Cart"
                width={16}
                height={20}
              />
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
