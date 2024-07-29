import React from 'react'
import IconBtn from './IconBtn'
import { VscSignOut } from 'react-icons/vsc'

const ConfirmationModel = ({modalData}) => {
  return (
    <div className='fixed inset-0  !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6'>
            <p className="text-2xl font-semibold text-richblack-5">
                {modalData.text1}
            </p>
            <p className="mt-3 mb-5 leading-6 text-richblack-200">
                {modalData.text2}
            </p>
            <div className="flex items-center gap-x-4">
            <div className='flex cursor-pointer  items-center gap-x-1 bg-yellow-50 text-black font-semibold py-[8px] px-[20px] rounded-md '>
            <IconBtn
             text={modalData.btnText1}
             onclick={modalData.btnHandler1}
            />
            <VscSignOut />
            </div>
                <button
                className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900"
                onClick={modalData?.btnHandler2}
                >
                {modalData.btnText2}
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModel
