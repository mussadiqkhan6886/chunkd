'use client';

import React, { useEffect, useState } from 'react';

const DeliveryTiming = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const deliveryStartHour = 11; // 11 AM
  const deliveryEndHour = 18; // 6 PM

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000 * 60); // update every minute
    return () => clearInterval(timer);
  }, []);

  const isOpen =
    currentTime.getHours() >= deliveryStartHour &&
    currentTime.getHours() < deliveryEndHour;

  return (
    <section className="width bg-black text-secondary">
      <h2 className="sectionTitle text-soft">Delivery & Cut-off Time</h2>
      <div className="flex flex-col max-w-2xl px-10 md:px-0 mx-auto items-center gap-3">
        <div className="flex w-full justify-between items-center p-3 border rounded-md">
          <span className='uppercase font-medium'>Delivery</span>
          <span
            className={`font-semibold ${
              isOpen ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {isOpen ? 'Available' : 'Unavailable'}
          </span>
        </div>
        <div className="flex w-full justify-between items-center p-3 border rounded-md">
          <span className='uppercase font-medium'>Pickup</span>
          <span
            className={`font-semibold ${
              isOpen ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {isOpen ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>
      <p className="mt-2 text-center pt-5 text-sm text-gray-200">
        Delivery timing: 11:00 AM - 6:00 PM
      </p>
    </section>
  );
};

export default DeliveryTiming;
