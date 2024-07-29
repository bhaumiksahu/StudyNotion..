import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';

const LoginForm = () => {
    const [formData,setFormData]=useState({email:"",password:""});
    const [showPassword,setShowPassword]=useState(false)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const changeHandler=(e)=>{
        setFormData((prevData)=>({
            ...prevData,
            [e.target.name]:e.target.value,
        })
        )
    }
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        dispatch(login(formData.email,formData.password,navigate))
    }
    return (
    <form onSubmit={handleOnSubmit} className="mt-6 flex w-full flex-col gap-y-4">
        <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address<sup className="text-pink-200">*</sup></p>
            <input
            required
            type='text'
            name='email'
            value={formData.email}
            onChange={changeHandler}
            placeholder='Enter your email'
            className='form-style w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            
            />
        </label>

        <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Password <sup className="text-pink-200">*</sup></p>
            <input 
            required
            type={showPassword?"text":"password"}
            name="password"
            value={formData.password} 
            onChange={changeHandler}
            placeholder='Enter Password'
            className='form-style w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            />
           <span
           onClick={() => setShowPassword((prev) => !prev)}
           className="absolute right-3 top-[38px] z-[10] cursor-pointer"
           >
                {showPassword?
                (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />):
                (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)}
            </span>
            <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            <Link to="/forgot-password">
               
                Forgot Password
                
            </Link>
            </p>
        </label>

        <button type='submit' className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
            Sign In
        </button>

    </form>
  )
}

export default LoginForm


