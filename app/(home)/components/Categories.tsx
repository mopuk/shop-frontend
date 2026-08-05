import CategoryCard from "./CategoryCard";

export default function Categories() {
  return (
    <div className="w-full px-55 py-4">
      <h2 className="font-montserrat font-bold text-2xl">Categories</h2>
      <div className="bg-primary w-16 h-2 rounded-xl"></div>
      <div className="grid grid-cols-3 gap-10 mt-6 text-center">
        <CategoryCard title="Oxfords" />
        <CategoryCard title="Sneakers" />
        <CategoryCard title="Loafers" />
      </div>
    </div>
  );
}
