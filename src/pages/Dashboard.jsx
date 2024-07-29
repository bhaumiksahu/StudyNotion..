import React from 'react'
import { useSelector } from 'react-redux'
import spinner from '../assets/Images/loading.gif'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/DashboardPage/Sidebar'
import Footer from '../components/common/Footer'
const Dashboard = () => {
    const {loading:authLoading}=useSelector((state)=>state.auth)
    const {loading:profileLoading}=useSelector((state)=>state.profile)
    if(profileLoading || authLoading){
        return(
            <div className='flex items-center justify-center'>
                <img src={spinner} alt='' className='h-[200px] w-[200px] mt-6'/>
            </div>
           
        )
    }
    return (
    <div>
      <div className='relative flex min-h-[calc(100vh-3.5rem)] text-richblack-5'>  
      <Sidebar/>
      <div className='overflow-auto flex-1 min-h-[calc(100vh-3.5rem)'>
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
            <Outlet/>
        </div>
      </div>
      
    </div>
    <Footer/>
    </div>
  )
}

export default Dashboard
