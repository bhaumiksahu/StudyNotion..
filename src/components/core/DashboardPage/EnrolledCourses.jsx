import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enrolledCourses } from "../../../services/operations/settingAPI";
import loadingImg from "../../../assets/Images/loading.gif"
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";
const EnrolledCourses = () =>{
    
    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [enrolledCourse,setEnrolledCourse]=useState(null);

    const getEnrolledCourses=async() => {
        try {
            const response=await dispatch(enrolledCourses(token));
            setEnrolledCourse(response);
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getEnrolledCourses()
    },[dispatch, token]);
    return (
        <div>
            <div className="text-3xl text-richblack-50 border-b border-b-richblack-400 pb-3">Enrolled Courses</div>
            {
                !enrolledCourse?
                (<div className='flex items-center justify-center'><img src={loadingImg} alt="" className='h-[200px] w-[200px] mt-6 ' /></div>)
                :
                
                    !enrolledCourse.length?
                    (<p className="grid h-[10vh] w-full place-content-center text-richblack-5">You have not enrolled in any courses</p>)
                    :
                    (
                        <div className="my-8 text-richblack-5">
                            <div className="flex rounded-t-lg bg-richblack-500 ">
                                <p className="w-[45%] px-5 py-3">Course Name</p>
                                <p className="w-1/4 px-2 py-3">Duration</p>
                                <p className="flex-1 px-2 py-3">Progress</p>
                            </div>
                            {/* cards */}
                            {
                                enrolledCourse.map((course,i,arr)=>{
                                    return(
                                        <div key={i}
                                        className={`flex items-center border border-richblack-700 ${
                                        i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                                        }`}
                                        >
                                            <div  className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                            
                                            >
                                                <img src={course.thumbnail} alt=""
                                                className="h-14 w-14 rounded-lg object-cover"
                                                />
                                                <div className="flex max-w-xs flex-col gap-2">
                                                    <p className="font-semibold">{course.courseName}</p>
                                                    <p className="text-xs text-richblack-300">{course.courseDescription.length > 50
                                                    ? `${course.courseDescription.slice(0, 50)}...`: course.courseDescription}</p>
                                                </div>
                                            </div>

                                            <div className="w-1/4 px-2 py-3">
                                                {course.totalDuration}
                                            </div>

                                            <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                                                <p>Progress:{course.progressPercentage||0}%</p>
                                                <ProgressBar
                                                    completed={course.progressPercentage|0}
                                                    height="8px"
                                                    isLabelVisible={false}
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    
                )
            }
        </div>
    )
}

export default EnrolledCourses;



// import { useEffect, useState } from "react"
// import ProgressBar from "@ramonak/react-progress-bar"
// //import { BiDotsVerticalRounded } from "react-icons/bi"
// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { enrolledCourses } from "../../../services/operations/settingAPI"

//import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

// export default function EnrolledCourses() {
//   const { token } = useSelector((state) => state.auth)
//   const navigate = useNavigate()

//   const [enrolleddCourses, setEnrolledCourses] = useState(null)

//   useEffect(() => {
//     ;(async () => {
//       try {
//         const res = await enrolledCourses(token) // Getting all the published and the drafted courses

//         // Filtering the published course out
//         const filterPublishCourse = res.filter((ele) => ele.status !== "Draft")
//         // console.log(
//         //   "Viewing all the couse that is Published",
//         //   filterPublishCourse
//         // )

//         setEnrolledCourses(filterPublishCourse)
//       } catch (error) {
//         console.log("Could not fetch enrolled courses.")
//       }
//     })()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   return (
//     <>
//       <div className="text-3xl text-richblack-50">Enrolled Courses</div>
//       {!enrolleddCourses ? (
//         <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//           <div className="spinner"></div>
//         </div>
//       ) : !enrolleddCourses.length ? (
//         <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
//           You have not enrolled in any course yet.
//           {/* TODO: Modify this Empty State */}
//         </p>
//       ) : (
//         <div className="my-8 text-richblack-5">
//           {/* Headings */}
//           <div className="flex rounded-t-lg bg-richblack-500 ">
//             <p className="w-[45%] px-5 py-3">Course Name</p>
//             <p className="w-1/4 px-2 py-3">Duration</p>
//             <p className="flex-1 px-2 py-3">Progress</p>
//           </div>
//           {/* Course Names */}
//           {enrolledCourses.map((course, i, arr) => (
//             <div
//               className={`flex items-center border border-richblack-700 ${
//                 i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
//               }`}
//               key={i}
//             >
//               <div
//                 className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
//                 onClick={() => {
//                   navigate(
//                     `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
//                   )
//                 }}
//               >
//                 <img
//                   src={course.thumbnail}
//                   alt="course_img"
//                   className="h-14 w-14 rounded-lg object-cover"
//                 />
//                 <div className="flex max-w-xs flex-col gap-2">
//                   <p className="font-semibold">{course.courseName}</p>
//                   <p className="text-xs text-richblack-300">
//                     {course.courseDescription.length > 50
//                       ? `${course.courseDescription.slice(0, 50)}...`
//                       : course.courseDescription}
//                   </p>
//                 </div>
//               </div>
//               <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
//               <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
//                 <p>Progress: {course.progressPercentage || 0}%</p>
//                 <ProgressBar
//                   completed={course.progressPercentage || 0}
//                   height="8px"
//                   isLabelVisible={false}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   )
// }