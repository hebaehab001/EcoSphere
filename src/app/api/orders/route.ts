import { rootContainer } from "@/backend/config/container";
import { OrderController } from "@/backend/features/orders/order.controller";
import { requireAuth } from "@/backend/utils/authHelper";
import { ok, serverError } from "@/types/api-helpers";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { items, paymentMethod, orderStatus } = await req.json();
  try {
    const user = await requireAuth();
    const order = await rootContainer
      .resolve(OrderController)
      .createOrder({
        items,
        userId: user.id,
        paymentMethod,
        status: orderStatus,
      });
    return ok(order);
  } catch (error) {
    console.error(error);
    return serverError();
  }
};

export const GET = async () => {
  try {
    const user = await requireAuth();
    const orders = await rootContainer
      .resolve(OrderController)
      .getUserOrders(user.id);
    return ok(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return serverError("Failed to fetch orders");
  }
};
