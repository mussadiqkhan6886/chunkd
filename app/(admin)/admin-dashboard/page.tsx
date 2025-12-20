"use client";

import { useEffect, useState } from "react";

type Analytics = {
  totalSales: number;
  ordersThisWeek: number;
  bestSellingCookie: string;
  repeatCustomers: number;
  revenueByDate: Record<string, number>;
};

export default function AdminDashboard() {
  const [data, setData] = useState<Analytics | null>(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="p-10 text-gray-500">Loading analytics...</div>
    );
  }

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">
        Admin Dashboard
      </h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Sales" value={`Rs. ${data.totalSales}`} />
        <StatCard title="Orders This Week" value={data.ordersThisWeek} />
        <StatCard title="Best Selling Cookie" value={data.bestSellingCookie} />
      </div>

      {/* REVENUE TABLE */}
      <section className="mt-10 bg-white rounded-xl border p-6">
        <h2 className="text-lg font-medium mb-4">
          Revenue by Date
        </h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">Date</th>
              <th className="py-2">Revenue (PKR)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data.revenueByDate).map(([date, revenue]) => (
              <tr key={date} className="border-b last:border-none">
                <td className="py-2">{date}</td>
                <td className="py-2 font-medium">Rs. {revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

function StatCard({
  title,
  value
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow transition">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
}
