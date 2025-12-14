'use client';

import React, { ReactElement, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { reviews } from '@/lib/constants';
import Link from 'next/link';
import { FiStar } from 'react-icons/fi';
import { reviewType } from '@/type';

const Reviews = () => {

  const [data, setData] = useState<reviewType[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/testimonials`, {next: {revalidate: 60}})

      const json = await res.json()

      const formattedData = json.testimonials.filter((item: reviewType) => item.approved === false)

      setData(formattedData)

    }

    fetchData()
  }, [])

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
      {data && data.length > 0 ? (
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
        {data.map((review, i) => (
          <SwiperSlide key={i}>
            <div className="flex flex-col items-center text-center p-6">
              <div className='flex gap-2 text-yellow-500'>{createStar(review.rating)}</div>
              <h3 className="text-lg font-semibold">{review.name}</h3>
              <p className="text-gray-700">{review.message}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      ) : <div className="text-center text-lg font-semibold text-gray-600">No Reviews Yet</div>}
    </div>
  );
};

export default Reviews;
