
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
//import { FreeMode, Pagination } from "swiper"
import Coursecard from "./Course_Card"
import {  Autoplay, Navigation, Pagination } from 'swiper/modules';
import FreeMode from 'swiper'
function Courseslider({ Courses }) {
//console.log(Courses);
  return (
    <>
      {Courses.course.length ? (
        
        <Swiper
        //   slidesPerView={1}
        //   spaceBetween={25}
        //   loop={true}
        //   modules={[Autoplay,Navigation, Pagination]}
        //   breakpoints={{
        //     1024: {
        //       slidesPerView: 3,
        //     },
        //   }}
        //   className="max-h-[30rem]"
        >
          {Courses?.course?.map((course, i) =>
           (
            <SwiperSlide key={i}>
              <Coursecard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default Courseslider
