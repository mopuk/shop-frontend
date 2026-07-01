import CatalogList from "@/components/CatalogList";

export default async function page() {
  let data = { variants: [] };
  try {
    const res = await fetch(process.env.BACKEND_URL + "/api/products");
    if (!res.ok) {
      return <div>Error on fetch</div>;
    }
    data = await res.json();
  } catch (e) {
    return <div>Error on fetch</div>;
  }

  return (
    <div>
      <CatalogList productVariants={data.variants} />
    </div>
  );
}
