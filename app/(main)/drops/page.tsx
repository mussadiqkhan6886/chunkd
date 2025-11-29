'use client';

import LimitedCard from '@/components/mainComp/LimitedCard';
import { cookies } from '@/lib/constants';

const DropsPage = () => {
  const res = cookies.filter(item => item.category === "limited")

  return (
    <main className="max-w-7xl mx-auto pt-30 p-5">

      {/* Heading */}
      <h1 className="text-6xl font-bold text-center mb-3">This Week’s Drops</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Limited-edition flavours dropping every week.  
        Once they’re gone — they’re gone. Stay ready, don’t miss out.
      </p>

      {/* Drops Grid */}
      <div >
        <LimitedCard data={res} button={false} />
      </div>
    </main>
  );
};

export default DropsPage;
