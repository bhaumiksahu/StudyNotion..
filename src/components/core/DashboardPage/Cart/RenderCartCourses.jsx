import React from 'react'
import { IoIosStarOutline } from 'react-icons/io'
import { IoStar } from 'react-icons/io5'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import {removeFromCart} from '../../../../slices/cartSlice'
import { FaStar } from 'react-icons/fa'
const RenderCartCourses = () => {
   const {cart}=useSelector((state)=>state.cart);
   const dispatch=useDispatch();
    return (
    <div className="flex flex-1 flex-col">
      {
        cart.map((course,indx)=>{
            return(
                <div key={indx}
                className={`flex w-full flex-wrap items-start justify-between gap-6 ${
                indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
                } ${indx !== 0 && "mt-6"} `}
                >
                  <div className="flex flex-1 flex-col gap-4 xl:flex-row">

                    <img src={course?.thumbnail} alt=''
                     className="h-[148px] w-[220px] rounded-lg object-cover"
                    />
                    <div className="flex flex-col space-y-1">
                        <p className="text-lg font-medium text-richblack-5">{course?.courseName}</p>
                        <p className="text-sm text-richblack-300">{course?.category?.name}</p>
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-5 flex items-center gap-2">4.5 <FaStar className='text-yellow-100 text-sm'/></span>
                            {/* <ReactStars
                            count={5}
                            value={course?.ratingAndReviews?.length}
                            size={20}
                            edit={false}
                            activeColor="#ffd700"
                            emptyIcon={<IoIosStarOutline/>}
                            fullIcon={<IoStar/>}
                            /> */}
                            <span className="text-richblack-400">{course?.ratingAndReview?.length}Review</span>
                        </div>
                    </div>

                  </div>
                    <div className="flex flex-col place-items-end space-y-2">
                    
                    <p className="mb-6 text-3xl font-medium text-yellow-100">
                    ₹ {course?.price}
                    </p>
                    <button
                    onClick={() => dispatch(removeFromCart(course._id))}
                    className="flex items-center gap-x-1 rounded-md border-[0.5px] border-pink-200 bord py-1 px-[6px] text-pink-200"
                    >
                    {/* <RiDeleteBin6Line /> */}
                    <span>Remove</span>
                    </button>
                    
                </div>
                </div>
               
            )
        })
      }
    </div>
  )
}

export default RenderCartCourses
