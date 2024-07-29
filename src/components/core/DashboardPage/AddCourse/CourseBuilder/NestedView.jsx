import React, { useState } from 'react'
// import { RxDropdownMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux'
import SubSectionModal from './SubSectionModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import ConfirmationModel from '../../../../common/ConfirmationModel'
import { RxDropdownMenu } from 'react-icons/rx';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiFillCaretDown } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';

const NestedView = ({ HandleEditSectionName }) => {
    const{course}=useSelector((state)=>state.course);
    const{token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    const [addSubSection,setAddSubSection]=useState(null);
    const [viewSubSection,setViewSubSection]=useState(null);
    const [editSubSection,setEditSubSection]=useState(null);

    const [confirmationModal,setConfirmationModal]=useState(null);

   const handleDelete =async(sectionId)=>{
    const result = await deleteSection({
        sectionId,
        courseId: course._id,
        token,
      })
      if (result) {
        dispatch(setCourse(result))
      }
      setConfirmationModal(null)
   }
   const handleDeleteSubSection =async(subSectionId,sectionId)=>{
      const result = await deleteSubSection({ subSectionId, sectionId, token })
      if (result) {
      // update the structure of course
        const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
        )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
      }
      setConfirmationModal(null)
   }

   return (
    <div>
       
        <div className="rounded-lg "  id="nestedViewContainer">

             {
                course.courseContent?.map((section,i)=>{
                    return(
                        <details key={section._id} open>
                       
                        <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">

                                <div className="flex items-center gap-x-3">
                                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                                    <p className='text-white'>{section.sectionName}</p>
                                </div>

                                <div className="flex items-center gap-x-3">
                                    <button
                                    onClick={()=>HandleEditSectionName(section._id,section.sectionName)}
                                    >
                                        <MdEdit className="text-xl text-richblack-100" />
                                    </button>

                                    <button
                                    onClick={()=>{
                                        setConfirmationModal({
                                            text1:"Delete this Section",
                                            text2:"All this lectures in this section will be deleted",
                                            btnText1:"Delete",
                                            btnText2:"Cancel",
                                            btnHandler1:()=>handleDelete(section._id),
                                            btnHandler2:()=>setConfirmationModal(null),
                                            
                                        })
                                    }}
                                    >
                                        <RiDeleteBin6Line className="text-xl text-richblack-100" />
                                    </button>
                                    <span className="font-medium text-richblack-300">|</span>
                                    <AiFillCaretDown className={`text-xl text-richblack-100`} />
                                </div>
                                </summary>
                                <div className="px-6 pb-4">
                                    {
                                        section.subSection.map((data,i)=>{
                                            return(
                                                <div key={i}
                                                onClick={()=>setViewSubSection(data)}
                                                className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                                                >
                                                    <div className="flex items-center gap-x-3 py-2 ">
                                                        <RxDropdownMenu className="text-2xl text-richblack-50" />
                                                        <p className='text-white'>{data.title}</p>
                                                    </div>

                                                    <div
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="flex items-center gap-x-3"
                                                    >
                                                        <button
                                                        onClick={()=>setEditSubSection({...data,sectionId:section._id})}
                                                        >
                                                            <MdEdit className="text-xl text-richblack-300" />
                                                        </button>
                                                        <button
                                                        onClick={()=>{
                                                                setConfirmationModal({
                                                                text1:"Delete this Sub Section",
                                                                text2:"Selected lectures in this section will be deleted",
                                                                btnText1:"Delete",
                                                                btnText2:"Cancel",
                                                                btnHandler1:()=>handleDeleteSubSection(data._id,section._id),
                                                                btnHandler2:()=>setConfirmationModal(null),
                                                            })
                                                        }}
                                                        >
                                                           <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    <button
                                        onClick={() => setAddSubSection(section._id)}
                                        className="mt-3 flex items-center gap-x-1 text-yellow-50"
                                        >
                                        <FaPlus className="text-lg" />
                                        <p>Add Lecture</p>
                                    </button>

                                </div>

                       
                        </details>
                    )
                })
             }

        </div>

        {addSubSection?(<SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />)
        :viewSubSection?(<SubSectionModal
            modalData={viewSubSection}
            setModalData={setViewSubSection}
            view={true}
        />)
        :editSubSection?(<SubSectionModal
            modalData={editSubSection}
            setModalData={setEditSubSection}
            edit={true}
        />)
        :(<div></div>)
        }
         {/* Confirmation Modal */}
      {confirmationModal ? (
        <ConfirmationModel modalData={confirmationModal} />
      ) : (
        <></>
      )}
    </div>
  )
}

export default NestedView
