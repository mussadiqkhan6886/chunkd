'use client';

import { useDrop } from '@/lib/context/contextAPI';
import React, { useEffect, useState } from 'react'

const Timer = ({product}: {product: CookieType}) => {
    const {getStatus, getCountdown} = useDrop()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

  const status = getStatus(product);
  const countdown = getCountdown(product);
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
