import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import loadingImg from "../assets/Images/loading.gif"
import { BiArrowBack } from 'react-icons/bi';
const ForgotPassword = () => {
    const {loading}=useSelector((state)=>state.auth);
    const[emailSent,setEmailSent]=useState(false);
    const dispatch=useDispatch();
    const[email,setEmail]=useState([""])
    const handleOnSubmit =(e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));
    }
    return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {
        loading ? (
         <div className='flex items-center justify-center'><img src={loadingImg} alt="" className='h-[200px] w-[200px] -mt-9' /></div>   
      ):(
        <div className="max-w-[500px] p-4 lg:p-8">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                {!emailSent?"Reset your Password":"Check your Email"}
            </h1>
            <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
               {!emailSent?"Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery":`We have sent the reset email to ${email}`} 
            </p>
            <form onSubmit={handleOnSubmit}>
                {
                    !emailSent && (
                        <label className="w-full">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address<sup className='text-pink-200'>*</sup></p>
                            <input
                            required
                            type='email'
                            name='email'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder='Enter your Email Address'
                            className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full"
                            />
                        </label>
                    )
                }
                <button type='submit'
                  className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                    {!emailSent?"Reset Password":"Resend email"}
                </button>
            </form>
            <div className="mt-6 flex items-center justify-between">
                <Link to="/login">
                   <p className="flex items-center gap-x-2 text-richblack-5"><BiArrowBack />Back to login</p>
                </Link>
            </div>
        </div>
      )
      }
    </div>
  )
}

export default ForgotPassword
