'use client';

import LimitedCard from '@/components/mainComp/LimitedCard';

const DropsPage = () => {

  return (
    <main className="max-w-7xl mx-auto pt-30 p-5">

      {/* Heading */}
      <h1 className="text-6xl font-bold text-center mb-3">This Week’s Drops</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Limited-edition flavours dropping every week.  
        Once they’re gone — they’re gone. Stay ready, don’t miss out.
      </p>

      {/* Drops Grid */}
      <div className="grid max-w-5xl mx-auto grid-cols-1 md:grid-cols-2 gap-10">
        <LimitedCard />
      </div>
    </main>
  );
};

export default DropsPage;
