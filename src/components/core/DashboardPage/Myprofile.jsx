import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { RiEditBoxLine } from 'react-icons/ri';

const Myprofile = () => {
    const {user}=useSelector((state)=>state.profile);
    const navigate=useNavigate();
    return (
    <div >
      
      <h1 className="mb-14 text-3xl text-richblack-50 border-b-[0.1px] pb-3 border-richblack-300">My Profile</h1>
        
      {/* section 1 */}
      <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
        <div className='flex items-center gap-x-4'>
            <img src={user?.image} alt='' className='aspect-square w-[78px] rounded-full object-cover'/>
            <div className="space-y-1">
                <p className="text-lg font-semibold text-richblack-5">{user?.firstName + " " + user?.lastName}</p>
                <p className="text-sm text-richblack-300">{user?.email}</p>
            </div>
        </div>
        <div className='flex  items-center gap-x-1 bg-yellow-50 text-black text-xl font-bold p-2 px-4 rounded-md opacity-0 md:opacity-100'>
        <IconBtn
        text="Edit"
        onclick={()=>{
            navigate("/dashboard/settings")
        }}
        />
        <RiEditBoxLine />
        </div>
      </div>
      
      {/* section 2 */}
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
          <div className='flex  items-center gap-x-1 bg-yellow-50 text-black text-xl font-bold p-2 px-4 rounded-md '>
            <IconBtn
             text="Edit"
             onclick={()=>{
             navigate("/dashboard/settings")
             }}
            />
            <RiEditBoxLine />
            </div>
        </div>
        
        <div className="flex lg:flex-row flex-col max-w-[500px] justify-between">

             <div className="flex flex-col  gap-y-5">

              <div>
                <p className="mb-2 text-sm text-richblack-500">FirstName</p>
                <p  className="text-sm font-medium text-richblack-5">{user?.firstName}</p>
              </div>

              <div>
                <p className="mb-2 text-sm text-richblack-500">Email</p>
                <p  className="text-sm font-medium text-richblack-5">{user?.email}</p>
              </div>

              <div>
                <p className="mb-2 text-sm text-richblack-500">Gender</p>
                <p className="text-sm font-medium text-richblack-5">{user?.additionalDetail?.gender ?? "Add your Gender"}</p>
              </div>

              </div>

            <div className="flex flex-col  gap-y-5 mt-5 lg:mt-0">
              <div>
                <p className="mb-2 text-sm text-richblack-500">LastName</p>
                <p  className="text-sm font-medium text-richblack-5">{user?.lastName}</p>
              </div>

              <div>
                <p className="mb-2 text-sm text-richblack-500">Phone Number</p>
                <p  className="text-sm font-medium text-richblack-5">{user?.additionalDetail.contactNumber?? "Add your Phone Number"}</p>
              </div>

              <div>
                <p className="mb-2 text-sm text-richblack-500">Date of Birth</p>
                <p  className="text-sm font-medium text-richblack-5">{user?.additionalDetail?.dateOfBirth ?? "Add Date of Birth"}</p>
              </div>

             </div>

        </div>

      </div>


      {/* section 3 */}
      <div className="my-10 flex flex-col gap-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
         <div className="flex w-full items-center justify-between ">
            <p className="text-lg font-semibold text-richblack-5">About</p>

            <div className='flex  items-center gap-x-1 bg-yellow-50 text-black text-xl font-bold p-2 px-4 rounded-md '>
            <IconBtn
             text="Edit"
             onclick={()=>{
             navigate("/dashboard/settings")
             }}
            />
            <RiEditBoxLine />
            </div>
         </div>
         <p className='text-richblack-300'>{user?.additionalDetail?.about ?? "Write something about yourself" }</p>
      </div>

      

    </div>
  )
}

export default Myprofile
