"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ImageSlider from "@/components/mainComp/ImageSlider";
import AddToCart from "@/components/mainComp/AddToCart";

const FilterClient = ({ cookies }: { cookies: CookieType[] }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // single select

  const filteredCookies = useMemo(() => {
    let updated = [...cookies];

    if (filter === "classic" || filter === "limited") {
      updated = updated.filter((c) => c.category === filter);
    } else if (filter === "hot") {
      updated = updated.filter((c) => c.hotSeller);
    }

    if (search.trim() !== "") {
      updated = updated.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return updated;
  }, [search, filter, cookies]);

  return (
    <>
      {/* Search + Filter */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 my-8">
        <div className="text-center text-gray-700 font-medium">
            Showing {filteredCookies.length} cookie
            {filteredCookies.length !== 1 ? "s" : ""}
        </div>
        <div className="flex gap-4 items-center">
            <input
            type="text"
            placeholder="Search cookies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-md "
            />

            <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-md "
            >
            <option value="all">All</option>
            <option value="classic">Classic</option>
            <option value="limited">Limited</option>
            <option value="hot">Hot Sellers</option>
            </select>
        </div>
      </div>

      {/* Cookies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-7xl mx-auto">
        {filteredCookies.map((cookie) =>
          cookie.soldOut || !cookie.active ? (
            <div
              key={cookie._id}
              className="flex flex-col justify-between items-center text-center border border-soft relative opacity-60"
            >
              <div className="w-full h-[420px]">
                <ImageSlider images={cookie.images} />
              </div>

              <div className="absolute z-30 top-5 left-5 bg-black text-white px-3 py-1 rounded-full text-sm">
                SOLD OUT
              </div>

              <div className="p-1">
                <h2 className="text-xl font-semibold mb-1">{cookie.title}</h2>
                <p className="text-sm text-gray-500">Will Be Back Soon</p>
              </div>
            </div>
          ) : (
            <div
              key={cookie._id}
              className="flex flex-col justify-between border border-soft relative"
            >
              <Link
                href={`/${
                  cookie.category === "limited" ? "drops" : "menu"
                }/${cookie.slug}`}
                className="h-[420px]"
              >
                <ImageSlider images={cookie.images} />
              </Link>

              {cookie.hotSeller && (
                <div className="bg-white/50 text-sm font-semibold px-2 py-1 absolute top-5 left-5">
                  🔥 Best Seller
                </div>
              )}

              <div className="p-3">
                <div className="flex justify-between items-center">
                  <h2>{cookie.title}</h2>
                  <h2 className="font-semibold text-lg md:text-xl">
                    Rs.{cookie.price}
                  </h2>
                </div>

                <p className="text-gray-500 text-[13px]">
                  Category: {cookie.category}
                </p>

                <AddToCart
                  releaseDate={cookie.releaseDate!}
                  endDate={cookie.endDate!}
                  soldOut={cookie.soldOut}
                  active={cookie.active}
                />
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default FilterClient;
