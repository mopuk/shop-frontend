import OrderDetailClient from "@/src/entities/order/ui/OrderDetailClient";

interface PageProps {
  params: Promise<{
    orderNumber: string;
  }>;
}

export default async function OrderPage({ params }: PageProps) {
  const { orderNumber } = await params;
  return <OrderDetailClient orderNumber={orderNumber} />;
}
