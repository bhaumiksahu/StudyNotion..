import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import IconBtn from '../../../../common/IconBtn';
import { MdAddCircleOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { BiRightArrow } from 'react-icons/bi';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';

const CourseBuilderForm = () => {
  const {register,handleSubmit,setValue,formState:{errors}}=useForm();
  const[editSectionName,setEditSectionName]=useState(null);
  const [loading,setLoading]=useState(false);
  const {course}=useSelector((state)=>state.course);
  const {token}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  const cancelEdit = () =>{
      setEditSectionName(null);
      setValue("sectionName","")
  }

  const goback = () =>{

    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  const goToNext = () =>{

   
    if(course.courseContent.length === 0){
      toast.error("Please Add atleast one Section");
      return;
    }

    if(course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add atleast one lecture in each section")
      return ;
    }
    
    dispatch(setStep(3));
  }

  const onSubmit = async (data) =>{

    setLoading(true);
    let result;
    if(editSectionName){
      result =await updateSection ({
          sectionName:data.sectionName,
          sectionId:editSectionName,
          courseId:course._id,
      },token)
    }
    else{
      result = await createSection({
        sectionName:data.sectionName,
        courseId:course._id,
      },token)
    }

    console.log(result);
    if(result){
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName","");
    }

    setLoading(false);
  }

  const HandleEditSectionName = (sectionId, sectionName) =>{

    if(editSectionName===sectionId){
      cancelEdit();
      return
    }
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName);
  }
  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="sectionName">Section Name<sup className="text-pink-200">*</sup></label>

            <input
            id='sectionName'
            placeholder='Add section name'
            {...register('sectionName',{required:true})}
            className='form-style w-full rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5 '
            />
            {
              errors.secionName && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">SectionName is required</span>
            )
            }
          </div>
          
            <div className='flex items-baseline gap-4'>

            <div className='flex border  items-center gap-x-1 text-yellow-50 w-fit mt-4  p-2 px-4 rounded-md '>
            <IconBtn
             type="submit"
             outline={true}
             text={`${editSectionName?"Edit Section Name":"Create Section"}`}
             customClasses={"text-yellow-50"}
            />
               <MdAddCircleOutline size={20} className="text-yellow-50" />
               
             </div>
             {editSectionName && (
                <button
                type='submit'
                onClick={cancelEdit}
                className='text-sm text-richblack-300 underline'
                >
                  Cancel Edit
                </button>
              )}

            </div>
            
            

          
         
        </form>

        {
          course.courseContent.length > 0 && (
            <NestedView 
            HandleEditSectionName={HandleEditSectionName} />
          )
        }

        <div className="flex justify-end gap-x-3">

           <button
           type='submit'
           onClick={goback}
           className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
           >
              Back
           </button>

           <div className='flex  items-center gap-x-1 bg-yellow-50 text-black  font-semibold py-[8px] px-[16px] rounded-md '>
            <IconBtn
             text="Next"
             onclick={goToNext}
            />
            <BiRightArrow/>
            </div>

        </div> 
    </div>
  )
}

export default CourseBuilderForm
