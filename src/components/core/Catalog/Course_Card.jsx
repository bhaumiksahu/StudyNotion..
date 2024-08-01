import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating'
//import RatingStars from '../../common/RatingStars'
import { FaStar } from 'react-icons/fa'

const Coursecard = ({ course, Height }) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(course.ratingReviews)
    setAvgReviewCount(count)
  }, [course])

  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="">
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`${Height} w-full rounded-xl object-cover `}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3 mt-2">
            <div className='flex justify-between items-center'>
            <p className="text-xl text-richblack-5">{course?.courseName}</p>
            <p className="text-sm text-richblack-50">
             By: {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            </div>
            <div className='flex justify-between mr-1'>

            <div className="flex items-center gap-2">
              <div className='flex flex-row items-center gap-2 justify-center'>
              <FaStar className='text-yellow-100 text-lg'/>
                <span className="text-lg text-richblack-5">{avgReviewCount || 0}</span></div>
              {/* <ReactStars
                count={5}
                value={avgReviewCount || 0}
                size={20}
                edit={false}
                activeColor="#ffd700"
                emptyIcon={<FaRegStar />}
                fullIcon={<FaStar />}
              /> */}
              {/* <RatingStars Review_Count={avgReviewCount} /> */}
              <span className="text-richblack-400  ">
                 Ratings
              </span>
            </div>
            <p className="text text-richblack-5">Rs. {course?.price}</p>

            </div>
            
          </div>
        </div>
      </Link>
    </>
  )
}

export default Coursecard
