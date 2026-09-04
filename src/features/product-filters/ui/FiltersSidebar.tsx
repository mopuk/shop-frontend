import getProductFilters from "@/src/entities/product/api/getProductFilters";
import FiltersSidebarClient from "./FiltersSidebarClient";
import getCategories from "@/src/entities/category/api/getCategories";

export default async function Sidebar() {
  const filters = await getProductFilters();
  const categories = await getCategories();

  return <FiltersSidebarClient filters={filters} categories={categories} />;
}
