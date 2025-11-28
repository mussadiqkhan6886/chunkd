'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

type Props = {
  startTime: string; // ISO string or valid Date string
  endTime: string;   // ISO string or valid Date string
};

const DropButton = ({ startTime, endTime }: Props) => {
  const [buttonText, setButtonText] = useState("Pre-Order");

  useEffect(() => {
    const updateButton = () => {
      const now = new Date().getTime();
      const start = new Date(startTime).getTime();
      const end = new Date(endTime).getTime();

      if (now < start) {
        setButtonText("Pre-Order");
      } else if (now >= start && now <= end) {
        setButtonText("Buy Now");
      } else {
        setButtonText("Sold Out");
      }
    };

    updateButton(); // set initial text
    const interval = setInterval(updateButton, 1000); // optional: update every second

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  return (
    <div className="flex gap-6 items-center">
      {buttonText === "Sold Out" ? <p className='px-4 py-2 bg-red-500 text-white rounded-full'>{buttonText}</p> : <Link className='orderButtonStyle' href="/">{buttonText}</Link>}
      {buttonText !== "Sold Out" && <Link href={"/"} className='discoverButtonStyle'>Discover</Link> }
    </div>
  );
};

export default DropButton;
