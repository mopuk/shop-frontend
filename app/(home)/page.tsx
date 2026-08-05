import Brands from "./components/Brands";
import Categories from "./components/Categories";
import Featured from "./components/Featured";
import Hero from "./components/Hero";
import Newsletter from "./components/Newsletter";
import Philosophy from "./components/Philosophy";

export default function page() {
  return (
    <div className="flex flex-col items-center gap-10">
      <Hero />
      <Featured />
      <Categories />
      <Brands />
      <Philosophy />
      <Newsletter />
    </div>
  );
}
