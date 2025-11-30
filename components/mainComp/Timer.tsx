'use client';

import { useDrop } from '@/lib/context/contextAPI';
import React, { useEffect, useState } from 'react'

const Timer = ({releaseDate, endDate, soldOut, active}: {releaseDate: string, endDate: string, soldOut: boolean, active: boolean}) => {
    const {getStatus, getCountdown} = useDrop()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

  const status = getStatus(releaseDate, endDate, soldOut, active);
  const countdown = getCountdown(releaseDate);

  return (
    <div>
      {mounted && status === "Coming Soon" && (
        <div className="mt-2 text-lg font-bold text-soft">
        {countdown}
        </div>
    )}
    </div>
  )
}

export default Timer
