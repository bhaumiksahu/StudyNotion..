import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
//import {apiConnector} from "../../../services/apiconnector"
import CountryCode from "../../../data/countrycode.json"
import toast from 'react-hot-toast'
const ContactUsForm = () => {
    const [loading,setLoading]=useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    }=useForm();

    useEffect (()=>{
        if(true){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:""
            })
        }},[reset,isSubmitSuccessful])
    
    const submitContactForm = async(data) =>{
        const toasdId=toast.loading("Sent Successful");
        reset({
            email:"",
            firstname:"",
            lastname:"",
            message:"",
            phoneNo:""
        })
        toast.dismiss(toasdId);


    }
    return (
    <div>
        <form 
        className="flex flex-col gap-7">
         
            <div className="flex flex-col gap-5 lg:flex-row">
                {/* firstName */}
                <div className="flex flex-col gap-[3px] lg:w-[48%]">
                    <div className='flex'>
                       <label htmlFor='firstname'  className=' text-[0.875rem] leading-[1.375rem] text-richblack-5'>First Name</label>
                        <span><sup className='text-pink-300'>*</sup></span>
                        </div>
                    <input 
                    name='firstname'
                    id='firstname'
                    className='form-style w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 '
                    type='text'
                    placeholder='enter firstname'
                    {...register("firstname",{required:true})}
                    />
                    {
                        errors.firstname && (
                            <span>
                                Please enter your firstname
                            </span>
                        )
                    }
                </div>

                {/* lastname */}
                <div className="flex flex-col gap-[3px] lg:w-[48%]">
                    <label htmlFor='lastname' className=' text-[0.875rem] leading-[1.375rem] text-richblack-5'>Last Name</label>

                    <input
                    name='lastname'
                    id='lastname'
                    className='form-style w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                    placeholder='enter lastname'
                    type='text'
                    {
                        ...register("lastname")
                    }
                    />
                    {
                        errors.lastname && (
                            <span>Please enter a lastname</span>
                        )
                    }
                </div>

            </div>

            {/* email */}
            <div className="flex flex-col gap-[3px] ">
                <div>
                    <label htmlFor='email' className=' text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                        Email
                    </label>
                    <sup className='text-pink-300'>*</sup>
                </div>

                    <input
                    name='email'
                    type='text'
                    placeholder='Enter a email'
                    id='email'
                    className='form-style w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                    {
                        ...register("email",{
                            required:true
                        })
                    }
                    />
                    {
                        errors.email && (
                            <span>Please enter email address</span>
                        )
                    }
            </div>
            
            {/* contact */}
            <div  className="flex flex-col gap-[3px]">
                <div className='flex items-center'>
                <label htmlFor='phonenumber' className=' text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                    Phone Number
                </label>
                <sup className='text-pink-300'>*</sup>
                </div>
                
                <div  className="flex gap-5">
                  {/* dropdown */}
                  <div className="flex w-[81px] flex-col gap-2">
                    <select 
                    name='dropdown'
                    className='bg-richblack-800  w-full rounded-[0.5rem] p-[14px] pl-[1px] text-richblack-5'
                    id='dropdown'
                    {
                        ...register("countrycode",{required:true})
                    }
                    >
                     {
                        CountryCode.map((ele,i)=>{
                            return(
                                <option key={i} value={ele.code}>
                                   {ele.code} {ele.country}
                                </option>
                            )
                        })
                     }
                    </select>
                  </div>
                  <div className='w-full bg-richblack-800  rounded-[0.5rem]'>
                    <input
                    id='phonenumber'
                    name='phonenumber'
                    type=""
                    className='bg-richblack-800 focus:outline-none  rounded-[0.5rem] p-[12px] text-richblack-5'
                    placeholder='12345 6789'
                    {
                      ...register("phoneNo",
                        {
                        required:true,
                        maxLength:{
                         value:10,
                         message:"Invalid phone Number"},
                        minLength:{
                         value:10,
                         message:"Invalid phone Number"
                        }
                      })  
                    }
                    />
                    {errors.message && (
                        <span>
                            Please enter a phone number
                        </span>
                    )}
                  </div>
                </div>
            </div>

            {/* message */}
            <div className='flex flex-col gap-[3px] '>
                    
                    <div>
                      <label htmlFor='message' className='text-[0.9rem] leading-[1.375rem] text-richblack-5'>Message</label>
                       <sup className='text-pink-300'>*</sup>
                    </div>

                    <textarea
                    name='message'
                    id='message'
                    className='bg-richblack-800 p-2 rounded-md text-richblack-5'
                    placeholder='Enter a message here'
                    cols="38"
                    rows="7"
                    {
                        ...register("message" ,{
                            required:true
                        })
                    }
                    />
                    {
                        errors.message && (
                            <span>Please enter your message</span>
                        )
                    }
            </div>

            {/* button */}
            <button type='Submit'
            disabled={loading}
            className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
      >
                Send Message
            </button>
          
        </form>
    </div>
  )
}

export default ContactUsForm
