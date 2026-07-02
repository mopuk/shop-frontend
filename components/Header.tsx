import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center w-full h-10">
      <div className="flex flex-1 items-center">
        <button>
          <Image src={"/images/menu.svg"} alt={"Menu"} width={40} height={40} />
        </button>
        <Link href={"/"}>
          <Image src={"/images/Logo.svg"} alt="Logo" height={32} width={160} />
        </Link>
      </div>
      <nav className="flex flex-1 justify-center gap-2 h-full items-center">
        <Link href="/" className="font-poppins text-white text-lg">
          MAIN
        </Link>
        <Link href="/catalog" className="font-poppins text-white text-lg">
          CATALOG
        </Link>
      </nav>
      <div className="flex flex-1 justify-end">
        <Link href={"/cart"} className="relative px-4">
          <Image
            src={"/images/shopping_cart.svg"}
            alt="Cart"
            width={40}
            height={40}
          />
          <div className="absolute top-0 right-1 px-2 rounded-full text-white text-sm bg-linear-0 from-green-300 to-green-400">
            0
          </div>
        </Link>
      </div>
    </header>
  );
}
