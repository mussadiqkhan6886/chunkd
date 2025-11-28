'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { reviews } from '@/lib/constants';

const Reviews = () => {
  return (
    <div className="width">
      <h2 className='sectionTitle'>Reviews</h2>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
         breakpoints={{
          640: { slidesPerView: 1 },  // mobile
          768: { slidesPerView: 2 },  // tablet and above
          1048: { slidesPerView: 3 },  // tablet and above
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="flex flex-col items-center text-center p-6">
              <h3 className="text-lg font-semibold">{review.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{review.role}</p>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
