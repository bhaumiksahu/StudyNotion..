import React from 'react'
import image from "../assets/Images/not-found.png"
const Error = () => {
  return (
    <div className='flex flex-col justify-center items-center '>
     
      <img alt='' src={image} className='h-[200px] w-[200px] mt-28 mb-2 '/>
      <h1 className='text-richblack-5 text-3xl '>Page Not Found ❌</h1>
    </div>
  )
}

export default Error
