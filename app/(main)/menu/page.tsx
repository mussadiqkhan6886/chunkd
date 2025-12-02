import FilterClient from "@/components/mainComp/Filteration";
import { connectDB } from "@/lib/config/databse";
import CookieSchema from "@/lib/models/CookieSchema";

export const revalidate = 60;

const MenuPage = async () => {

  await connectDB()

  const res = await CookieSchema.find({}).lean()

  const cookies = JSON.parse(JSON.stringify(res))

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
