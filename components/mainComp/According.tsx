'use client';

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const Accordion = ({ title, children }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 pb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-2"
      >
        <span className="font-semibold text-lg">{title}</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}><FiChevronDown /></span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-gray-600 mt-2">{children}</div>
      </div>
    </div>
  );
};

export default Accordion