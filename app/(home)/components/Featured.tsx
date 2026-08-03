"use client";
import { useQuery } from "@tanstack/react-query";
import FeaturedCard from "./FeaturedCard";

export default function Featured() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/api/v1/products?featured=true",
      );
      return await response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  console.log(data);
  if (error) return <div>{error.message}</div>;

  return (
    <div className="px-55 py-4">
      <h2 className="font-montserrat font-bold text-2xl">
        Featured Collection
      </h2>
      <div className="bg-primary w-16 h-2 rounded-xl"></div>
      <div className="grid grid-cols-3 gap-10 mt-6 text-center"></div>
    </div>
  );
}

/*{data.map((variant) => (
          <FeaturedCard title={variant.product.name} url={variant.thumbnail} />
        ))}*/
