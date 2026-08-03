export default function CategoryCard({ title }: { title: string }) {
  return (
    <div className="bg-green-200 font-montserrat font-semibold text-neutral text-xl py-7 rounded-xl">
      {title}
    </div>
  );
}
