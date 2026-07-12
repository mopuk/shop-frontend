import CatalogList from "./components/CatalogList";

export default async function page() {
  let data = { variants: [] };
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products`);
    if (!res.ok) {
      console.log(res.status)
      return <div>Error on fetch</div>;
    }
    data = await res.json();
    console.log(data)
  } catch (e) {
    console.log(e)
    return <div>Error on fetch</div>;
  }

  return (
    <div>
      <CatalogList productVariants={data.variants} />
    </div>
  );
}
