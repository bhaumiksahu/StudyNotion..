import React from 'react'
import * as Icons from 'react-icons/vsc'
import { matchPath, NavLink, useLocation } from 'react-router-dom'
const SidebarLinks = ({link,iconName}) => {
    const Icon=Icons[iconName]
    const location =useLocation();
    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname)
    }
    return (
    <div className={`${matchRoute(link.path)?"bg-yellow-800":
    " text-richblack-5 "} relative px-2 py-2 `}>
        <NavLink
        to={link.path}
        className={`  w-full text-sm font-medium ${matchRoute(link.path)?"bg-yellow-800":
        " text-richblack-5"} flex justify-between `}
        >
        <span className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${matchRoute(link.path)?"opacity-100":"opacity-0"} `}>
        </span>
        <div className=" items-center gap-x-2 md:ml-6 flex">
        <Icon className="text-lg"/>
        <span className='hidden md:flex'>{link.name}</span>
        </div>
    </NavLink>
    </div>
  )
}

export default SidebarLinks
