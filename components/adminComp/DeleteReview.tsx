'use client';

import axios from 'axios';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import AdminCheck from './AdminCheck';
import { useDrop } from '@/lib/context/contextAPI';

const DeleteReview = ({id}: {id: string}) => {

    const [result, setResult] = useState("")
     const [showAdminCheck, setShowAdminCheck] = React.useState(false)
      const {isAdmin, setIsAdmin} = useDrop()

    const deleteTest = async () => {
        setIsAdmin(false)
        if(isAdmin){
            const res = await axios.delete(`/api/testimonials/${id}`)
            if(res.data.success){
                setResult("Review Deleted Successfully")
            }else{
                setResult("Review Failed to Delete")
            }
        }else{
            setShowAdminCheck(true)
        }
    }
    

  return (
    <>
    <button onClick={deleteTest} className="text-red-600 cursor-pointer hover:text-red-800">
        <Trash />
    </button>
     {showAdminCheck && 
    (<AdminCheck onClose={() => setShowAdminCheck(false)} />)
    }
    <p>{result}</p>
    </>
  )
}

export default DeleteReview
