import Brands from "../../features/homepage/components/Brands";
import Categories from "../../features/homepage/components/Categories";
import Featured from "../../features/homepage/components/Featured";
import Hero from "../../features/homepage/components/Hero";
import Newsletter from "../../features/homepage/components/Newsletter";
import Philosophy from "../../features/homepage/components/Philosophy";

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
