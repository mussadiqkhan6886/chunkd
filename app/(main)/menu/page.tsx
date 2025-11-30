import FilterClient from "@/components/mainComp/Filteration";

const MenuPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    next: { revalidate: 60 },
  });

  const json = await res.json();
  const cookies: CookieType[] = json.data;

  return (
    <main className="bg-secondary pt-24">
      {/* Header */}
      <div className="py-5 px-2">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 text-center">
          Find Your Next Craving
        </h1>
        <p className="text-center">
          Discover our full lineup of Chunk’d cookies — from classics to
          limited-edition drops.
          <br />
          Filter, search, and explore every flavor. Build the perfect treat.
        </p>
      </div>

      {/* Search + Filter */}
      <FilterClient cookies={cookies} />
    </main>
  );
};

export default MenuPage;
