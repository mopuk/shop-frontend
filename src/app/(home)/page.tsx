import Brands from "../../features/homepage/components/Brands";
import Categories from "../../features/homepage/components/Categories";
import Featured from "../../features/homepage/components/Featured";
import Hero from "../../features/homepage/components/Hero";
import Newsletter from "../../features/homepage/components/Newsletter";
import Philosophy from "../../features/homepage/components/Philosophy";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full gap-16 sm:gap-24 overflow-hidden pb-12">
      <Hero />
      <Featured />
      <Categories />
      <Brands />
      <Philosophy />
      <Newsletter />
    </div>
  );
}
