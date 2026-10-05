import PaymentClient from "@/src/features/payment/ui/PaymentClient";

export default async function Page({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  return <PaymentClient orderNumber={orderNumber} />;
}
