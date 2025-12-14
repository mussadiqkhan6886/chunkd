'use client';

import React, { useState } from 'react'

const ApproveSystem = ({id}: {id: string}) => {

    const [loading, setLoading] = useState(false)

    const approve = async () => {
        
        try{
            setLoading(true)
            const res = await fetch(`/api/testimonials/${id}`, {
                method: "PATCH",
            })
    
            if(res.ok){
                alert("Review Approved")
            }else{
                alert("Failed Approving Review")
            }
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false)
        }
    }

  return (
    <div>
      <button className='bg-red-600 text-white rounded-md px-4 py-1.5 cursor-pointer' onClick={approve}>{loading ? "Loading..." : "Not Approved"}</button>
    </div>
  )
}

export default ApproveSystem
