"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

export default function NoticeBanner() {

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
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="
            absolute top-18 left-10
            bg-yellow-300 text-yellow-900
            px-7 text-sm py-4 shadow-lg font-semibold
            rounded-full
          "
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Shop is closed, orders will be delivered tomorrow
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
