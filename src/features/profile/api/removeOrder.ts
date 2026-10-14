export default async function removeOrder(orderNumber: string) {
  const tokenType = localStorage.getItem("token_type");
  const accessToken = localStorage.getItem("access_token");

  const response = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + `/api/v1/orders/${orderNumber}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${tokenType} ${accessToken}`,
      },
    },
  );

  if (response.status == 401) {
    return {
      status: response.status,
      error: "Для удаления заказа необходима авторизация",
    };
  } else if (response.status == 409) {
    return {
      status: response.status,
      error: "Отменить оплаченный заказ нельзя",
    };
  }
  if (!response.ok) {
    return { status: null, error: "Ошибка удаления заказа" };
  }
  return { status: response.status, error: null };
}
