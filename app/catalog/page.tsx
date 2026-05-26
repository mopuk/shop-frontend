import CatalogList from "@/components/CatalogList";

export default async function page() {
  const data = await fetch(
    process.env.BACKEND_URL + "/api/products",
  ).then((res) => res.json());
  return (
    <div>
      <CatalogList initialProducts={data.variants} />
    </div>
  );
}
