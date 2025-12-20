import { connectDB } from "@/lib/config/databse";
import Order from "@/lib/models/OrderSchema";
import { CartItem, OrderDataType } from "@/type";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const orders = await Order.find().lean();

  const totalSales = orders.reduce(
    (sum, order) => sum + (order.pricing?.total || 0),
    0
  );

  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const ordersThisWeek = orders.filter(order => {
    return new Date(order.createdAt) >= sevenDaysAgo;
  }).length;

  const cookieMap: Record<string, number> = {};

  orders.forEach(order => {
    order.items.forEach((item: OrderDataType) => {
      // SIMPLE / DROP ITEMS
      if (item.type !== "box") {
        cookieMap[item.name] =
          (cookieMap[item.name] || 0) + item.quantity;
      }

      // BOX ITEMS
      if (item.type === "box") {
        item.boxData.forEach((cookie: Cookie) => {
          cookieMap[cookie.cookieName] =
            (cookieMap[cookie.cookieName] || 0) + cookie.cookieQty;
        });
      }
    });
  });

  const bestSellingCookie =
    Object.entries(cookieMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";


  const revenueByDate: Record<string, number> = {};

  orders.forEach(order => {
    const dateKey = new Date(order.createdAt)
      .toISOString()
      .split("T")[0];

    revenueByDate[dateKey] =
      (revenueByDate[dateKey] || 0) + order.pricing.total;
  });

  return NextResponse.json({
    totalSales,
    ordersThisWeek,
    bestSellingCookie,
    revenueByDate,
  });
}
