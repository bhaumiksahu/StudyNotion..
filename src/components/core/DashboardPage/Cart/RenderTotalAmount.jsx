import React from 'react'
import IconBtn from '../../../common/IconBtn'
import { useDispatch, useSelector } from 'react-redux'
import { BuyCourse } from '../../../../services/operations/studentFeaturesAPI'
import { useNavigate } from 'react-router-dom'


const RenderTotalAmount = () => {
    const { total, cart } = useSelector((state) => state.cart)
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    console.log(courses);
    BuyCourse(token, courses, user, navigate, dispatch)
    }
  return (
    <div className="min-w-[250px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
    <p className="mb-1 text-xl font-medium text-richblack-300 flex justify-between ">Total:<p className="mb-6 text-2xl font-medium text-yellow-100">₹ {total}</p></p>
    

            <div className='flex w-fit  items-center gap-x-1 border-[0.5px] border-yellow-50 text-yellow-50 text p-2 px-4 rounded-md '>
            <IconBtn
             text="Buy Now"
             onclick={handleBuyCourse}
            />
            </div>
            <div className='min-w-[250px]'>
            <p className="min-w-[250px] pb-3 pt-6 text-center text-sm  text-richblack-25">
             Don't Scan Just enter your Number on UPI and pay
            </p>
          </div>
  </div>
  )
}

export default RenderTotalAmount
