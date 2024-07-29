import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import spinner from '../../../assets/Images/loading.gif'
import {sidebarLinks} from '../../../data/dashboard-links'
import SidebarLinks from './SidebarLinks'
import { useNavigate } from 'react-router-dom'
import {logout} from '../../../services/operations/authAPI'
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModel from '../../common/ConfirmationModel'
const Sidebar = () => {
    
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [confirmationModel,setConfirmationModel]=useState(null);
    const {loading:profileLoading,user}=useSelector((state)=>state.profile);
    const {loading:authLoading}=useSelector((state)=>state.auth);
    if(profileLoading || authLoading){
        return(
            <div className='flex items-center justify-center'>
                <img src={spinner} alt='' className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800"/>
            </div>
        )
    }
    return (
    <div className=" md:min-w-[222px] w-[50px] flex-col border-r-[1px] border-r-richblack-700 lg:flex h-[calc[100vh-3.5rem)] bg-richblack-800 py-10">
      <div className='flex flex-col'>
        {
            sidebarLinks.map((link,i)=>{
                if(link.type &&  link.type!==user?.accountType) return null;
                return(
                    <div key={i}>
                        <SidebarLinks link={link} iconName={link.icon}/>
                    </div>
                )
            })
        }
      </div>
      <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
      
      <div className='flex flex-col'>
        <SidebarLinks 
        link={{name:"Settings",path:"dashboard/settings"}}    
        iconName="VscSettingsGear"/>

        <button
        onClick={ () =>
            setConfirmationModel(
                {
                    text1:"Are You Sure ?",
                    text2:"You will be logged out from your account",
                    btnText1:"Logout",
                    btnText2:"Cancel",
                    btnHandler1: ()=> dispatch(logout(navigate)),
                    btnHandler2: ()=> setConfirmationModel(null)
                }
            )
        }
         className="px-8 py-2 text-sm font-medium mt-2 text-richblack-300 "
        >
          <div className='flex items-center gap-x-2 '>
            <VscSignOut className='text-lg'/>
            <span className='hidden md:flex'>Logout</span>
          </div>
        </button>
      </div>
       {confirmationModel && <ConfirmationModel modalData={confirmationModel}/>}
    </div>
  )
}

export default Sidebar
