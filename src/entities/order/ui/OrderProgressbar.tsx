import { Check } from "lucide-react";
import {
  ORDER_STATUS_LABELS,
  ORDER_STEP_STATUSES,
  OrderStatus,
  STEP_ICONS,
} from "../model";

export default function OrderProgressbar({
  currentStatus,
}: {
  currentStatus: OrderStatus;
}) {
  if (currentStatus === OrderStatus.canceled) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-700">
        <p className="text-sm font-semibold">Заказ отменен</p>
      </div>
    );
  }

  if (currentStatus === OrderStatus.failed) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-700">
        <p className="text-sm font-semibold">Ошибка при оплате заказа</p>
      </div>
    );
  }
  const currentInd = ORDER_STEP_STATUSES.indexOf(currentStatus);

  return (
    <div className="w-full py-6 bg-background">
      <ol className="flex gap-4 ">
        {ORDER_STEP_STATUSES.map((status, ind) => {
          const isCompleted = ind < currentInd;
          const isCurrent = ind === currentInd;
          const isLast = ind === ORDER_STEP_STATUSES.length - 1;

          const StepIcon = STEP_ICONS[status];

          return (
            <li key={ind} className="flex flex-col gap-2 relative flex-1">
              {!isLast && (
                <div
                  aria-hidden="true"
                  className={`absolute top-6 left-1/2 w-full h-1 -translate-y-1/2 transition-colors duration-300 ${
                    ind < currentInd ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex items-center justify-center z-10 w-12 h-12 rounded-full ${isCurrent ? "border-4 border-green-100/40" : ""} ${currentInd >= ind ? " bg-primary" : "bg-muted"}`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5 stroke-2.5 stroke-white" />
                  ) : (
                    <StepIcon
                      className={`stroke-2.5 ${isCompleted || isCurrent ? "stroke-white" : ""}`}
                    />
                  )}
                </div>

                <h3
                  className={`font-montserrat ${currentInd >= ind ? "font-medium" : ""}`}
                >
                  {ORDER_STATUS_LABELS[status]}
                </h3>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
