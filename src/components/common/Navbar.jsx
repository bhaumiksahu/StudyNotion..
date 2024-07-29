import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import {NavbarLinks} from "../../data/navbar-links"
import { useSelector } from 'react-redux'
import { AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { FaChevronDown } from 'react-icons/fa'
const Navbar = () => {
  
  const {token}=useSelector((state)=>state.auth);
  const {user}=useSelector((state)=>state.profile);
  const {totalItem}=useSelector((state)=>state.cart)
  const location = useLocation();
  const matchRoute=(route)=>{
    return matchPath({path:route},location.pathname)
  }
  const [subLink,setSubLink]=useState([]);
  const [loading,setLoading]=useState([false]);
  const fetchSublink=async()=>{
      setLoading(true);
      try {
        const result=await apiConnector("GET",categories.CATEGORIES_API);
        console.log("1 call ..."+result);
        setSubLink(result.data.allCategory);
      } catch(error){
        console.log("Could not fetch the category")
      }
      setLoading(false);
    }
  useEffect( ()=>{
    fetchSublink();
  },[])
  return (
    <div className=' flex h-14 items-center  justify-center border-b-[1px] border-b-richblack-700 z-50 bg-richblack-900'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

        {/* IMAGE LOGO */}
        <Link to="/">
           <img src={logo} width={160} height={42} alt='' className='hidden sm:block'/>
        </Link>

        {/* Nav Links */}
        <nav className="block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <FaChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLink?.length ? (
                          <div>
                            {subLink
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                    className="rounded-lg bg-transparent mt-4 pl-4 hover:text-richblack-600"
                                  key={i}
                                >
                                  <p className="">{subLink.name}</p>
                                </Link>
                              ))}
                          </div>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* login/signup/dashboard */}
        
        <div className=' items-center gap-x-4 flex'>
          {
            user && user?.accountType==="Student" && (
              <Link to="/dashboard/cart" className='relative'>
                <AiOutlineShoppingCart className="text-2xl text-richblack-100"/>
                {
                  totalItem>0 && (
                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItem}
                    </span>
                  )
                }
              </Link>
            )
          }

          {
            token===null && (
              <Link to="/login">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Log in
                </button>
              </Link>
            )
          }

          {
            token===null && (
              <Link to="/signup">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Sign Up
                </button>
              </Link>
            )
          }

          {
            token!==null && <ProfileDropDown/>
          }
        </div>
        {/* <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button> */}

      </div>
    </div>
  )
}

export default Navbar
