import BrandCard from "./BrandCard";

export default function Brands() {
  return (
    <div className="px-55 py-4">
      <h2 className="font-montserrat font-bold text-2xl">Brands</h2>
      <div className="bg-primary w-16 h-2 rounded-xl"></div>
      <div className="grid grid-cols-3 gap-10 mt-6 text-center">
        <BrandCard title="Tommy Hilfiger" />
        <BrandCard title="Under Armour" />
        <BrandCard title="Vans" />
      </div>
    </div>
  );
}
