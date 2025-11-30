"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
      spaceBetween={10}
      slidesPerView={1}
      className="w-full h-full"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index} className="flex items-center justify-center">
          <Image
            src={img}
            alt={`Slide ${index + 1}`}
            width={500}
            height={400}
            className="object-cover w-full h-full object-center"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
