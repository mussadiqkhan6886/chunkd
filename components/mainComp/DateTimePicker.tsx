'use client';

import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default function DateTimePicker({ onChange }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputRef.current) return;

    flatpickr(inputRef.current, {
      enableTime: true,
      dateFormat: "Y-m-d H:i",
      time_24hr: true,
      onChange: (dates) => onChange(dates[0]),
    });
  }, []);

  return (
    <input
      ref={inputRef}
      placeholder="Select date & time"
      className="w-full border rounded-lg p-2"
    />
  );
}
