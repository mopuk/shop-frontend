import CatalogList from "@/src/features/catalog/components/CatalogList";
import Sidebar from "@/src/features/catalog/components/Sidebar";

export default async function page() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_2fr]">
      <Sidebar />
      <CatalogList />
    </div>
  );
}
