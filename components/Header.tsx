import Link from "next/link";

export default function Header() {
  return (
    <header className="flex align-center w-full">
      <div className="flex-1">SHOP</div>
      <nav className="flex justify-center gap-2">
        <Link href="/">Главная</Link>
        <Link href="/catalog">Каталог</Link>
        <Link href="/cart">Корзина</Link>
      </nav>
      <div className="flex-1"></div>
    </header>
  );
}
