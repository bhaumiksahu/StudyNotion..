import React from 'react'

const Stats = () => {
    const stats=[
        {count:"5k",label:"Active Students"},
        {count:"10k",label:"Mentors"},
        {count:"200",label:"Courses"},
        {count:"50+",label:"Awards",order:"4"},
    ]
    return (
    <div className="bg-richblack-700 mt-5 lg:mt-28 flex flex-col gap-7 justify-between w-11/12 max-w-maxContent text-white mx-auto ">
       <div className="grid grid-cols-2 md:grid-cols-4 text-center">
       {stats.map((ele,i)=>{
        return(
            <div className={`flex flex-col py-5 px-0 border-r-richblack-300 md:border-r-[0.5px] 
            ${ele.order==="4" && "border-none"}`}
            key={i}>
            <h1 className="text-[30px] font-bold text-richblack-5">{ele.count}</h1>
            <h2 className="font-semibold text-[16px] text-yellow-25">{ele.label}</h2>
         </div> 
       )
       })}
       </div>
    </div>
  )
}

export default Stats
