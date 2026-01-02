import LimitedCard from '@/components/mainComp/LimitedCard';
import { connectDB } from '@/lib/config/databse';
import CookieSchema from '@/lib/models/CookieSchema';
import type { Metadata } from "next";

export const revalidate = 60

export const metadata: Metadata = {
  title: "Limited Cookie Drops",
  description:
    "Explore Chunk’d Cookies limited drops – exclusive, small-batch stuffed cookies available for a short time only. Once they’re gone, they’re gone.",
};


const DropsPage = async () => {

  await connectDB();

  const res = await CookieSchema.find({category: "limited"}).lean()

  const data = JSON.parse(JSON.stringify(res))

  return (
    <main className="max-w-7xl mx-auto pt-30 p-5">

      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-3">This Week’s Drops</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Limited-edition flavours dropping every week.  
        Once they are gone — they are gone. Stay ready, do not miss out.
      </p>

      {/* Drops Grid */}
      <div >
        <LimitedCard data={data} button={false} />
      </div>
    </main>
  );
};

export default DropsPage;
