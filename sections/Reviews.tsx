'use client';

import React, { ReactElement } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { reviews } from '@/lib/constants';
import Link from 'next/link';
import { FiStar } from 'react-icons/fi';

const Reviews = () => {

  const createStar = (stars: number) => {

    let starsArray: ReactElement[] = [];

    for(let i = 0; i < stars; i++){
      starsArray.push(<FiStar key={i} />)
    }

    return starsArray
  }

  return (
    <div className="width">
      <div className='flex justify-between items-center'>
      <h2 className='sectionTitle'>Reviews</h2>
        <Link href="/add-testimonial" className='underline mr-6'>Add Review</Link>
      </div>
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
        {reviews.map((review, i) => (
          <SwiperSlide key={i}>
            <div className="flex flex-col items-center text-center p-6">
              <div className='flex gap-2 text-yellow-500'>{createStar(parseInt(review.stars))}</div>
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
