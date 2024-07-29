import React, { useRef, useState } from 'react'
import { FiUpload } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import { UpdateProfilePicture } from '../../../../services/operations/settingAPI';

const ChangeProfilePicture = () => {
  const {token}=useSelector((state)=>state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)
  
  const fileInputRef=useRef();

  const handleClick=()=>{
    fileInputRef.current.click();
  }
  const handleFileChange=(e)=>{
      const file=e.target.files[0];
      if(file){
        setImageFile(file);
        previewFile(file);
      }
  }
  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload =()=>{
    try {
      setLoading(true);
      const formdata=new FormData();

      formdata.append("displayPicture",imageFile);

      dispatch(UpdateProfilePicture(token,formdata)).then(()=>{setLoading(false)}
        
    )
    } 
    catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">

        <div className="flex items-center gap-x-4">

          <img
            src={ previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-2">

            <p className=''>Change Profile Picture</p>
            <div className="flex flex-row gap-3">

            <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              /> 
               <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              >
                Select
              </button> 
              <div className='flex cursor-pointer  items-center gap-x-1 bg-yellow-50 text-black font-semibold py-[8px] px-[16px] rounded-md '>
                 <IconBtn
                 text={loading ? "Uploading..." : "Upload"}
                 onclick={handleFileUpload}
                 >
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}

                 </IconBtn>
            </div>
            </div>
          </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default ChangeProfilePicture
