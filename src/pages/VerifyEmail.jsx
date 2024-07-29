import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { sentOtp, signUp } from '../services/operations/authAPI';
import loadingImg from "../assets/Images/loading.gif"

const VerifyEmail = () => {

  const{loading,signupData}=useSelector((store)=>store.auth);
  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
  }, []);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[otp,setOtp]=useState("");
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(otp)
    const{firstName,lastName,email,password,confirmPassword,accountType}=signupData;
    dispatch(signUp(firstName,lastName,email,password,confirmPassword,accountType,otp,navigate))
  }
  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
        {
            loading ? 
            (<div className='flex items-center justify-center'> <img src={loadingImg} alt="" className='h-[200px] w-[200px] mt-6' /></div> ):
            (<div className="max-w-[500px] p-4 lg:p-8">
                <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">Verify Email</h1>
                <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">A verification email has been sent to you. Enter the code below</p>
                <form onSubmit={handleOnSubmit}>
                    <OTPInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderInput={(props)=> 
                      <input 
                        {...props}
                        placeholder="-"
                        style={{
                          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                      />}
                      containerStyle={{
                        justifyContent: "space-between",
                        gap: "0 6px",
                      }}
                    />
                    <button
                      type="submit"
                      className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
                    >
                    Verify Email
                    </button>
                </form>
                <div className='flex items-center  justify-between'>
                    <div className="mt-6 flex items-center justify-between">
                    <Link to="/signup">
                       <p className="flex items-center gap-x-2 text-richblack-5"><BiArrowBack />Back to  Signup</p>
                    </Link>
                    </div>
                    <button
                    className="flex items-center text-blue-100 gap-x-2 mt-6"
                    onClick={() => dispatch(sentOtp(signupData.email))}
                    >
                        Resent it
                    </button>
                </div>
            </div>)
        }
    </div>
  )
}

export default VerifyEmail
