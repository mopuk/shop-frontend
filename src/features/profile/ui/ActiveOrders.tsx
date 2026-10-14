import { Order } from "@/src/entities/order/model";
import ActiveOrderItem from "./ActiveOrderItem";

export default function ActiveOrders({
  orders,
}: {
  orders: Order[] | undefined;
}) {
  return (
    <div>
      <h2>Текущие заказы:</h2>
      <ul>
        {orders &&
          orders.map((order) => (
            <li key={order.id} className="shadown-md">
              <ActiveOrderItem order={order} />
            </li>
          ))}
      </ul>
    </div>
  );
}
