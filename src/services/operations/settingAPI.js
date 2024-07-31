import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import {  ProfileEnpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
import {logout} from "./authAPI"

export const UpdateProfilePicture =(token,formdata)=>{
  
  return async(dispatch)=>{
      
        const toastId=toast.loading("Updating Profile Picture...");
        try {
            const response=await apiConnector(
            "PUT",
            ProfileEnpoints.UPDATE_DISPLAY_PICTURE_API,
            formdata,
            {
                "Content-Type":"multipart/form-data",
                Authorization:`Bearer ${token}`
            })

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("profile Picture Updated Successfully");
            dispatch(setUser(response.data.message))
        } 
        catch (error) {
            toast.error("Could not upload display picture")
            console.log(error );
        }
        toast.dismiss(toastId);
    }
  
}

export function updateProfile(token, formData) {
    return async (dispatch) => {
      const toastId = toast.loading("Updating Profile...")
      try {
        const response = await apiConnector("PUT", ProfileEnpoints.UPDATE_PROFILE_API, formData, {
          Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE_PROFILE_API API RESPONSE............",response.data.profileDetails)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        
        toast.success("Profile Updated Successfully")
      } 
      catch (error) {
        console.log(error)
        toast.error("Could Not Update Profile")
      }
      toast.dismiss(toastId)
    }
}

export async function changePassword(token, formData) {
  const toastId = toast.loading("Updating Password...")
  try {
    const response = await apiConnector("POST", ProfileEnpoints.CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

export const deleteProfile = (token,navigate)=>{
  return async(dispatch)=>{
    const toastId=toast.loading("Deleting Account...")
    try {
      const response=await apiConnector("DELETE",ProfileEnpoints.DELETE_ACCOUNT_API,null,
        {
          Authorization:`Bearer ${token}`
        }
      )
      if(!response.data.success){
        throw new Error(response.data.message)
      }
      toast.success("Account Deleted Successfully")
      navigate("/");
      dispatch(logout(navigate));
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  } 
}

export const enrolledCourses = (token)=>{
  return async(dispatch)=>{
    //const toastId=toast.loading("loading...")
    let result=[];
    try {
      const response=await apiConnector("GET",ProfileEnpoints.ENROLLED_COURSES_API,null,
        {
          Authorization:`Bearer ${token}`
        }
      )

      if(!response.data.success){
        throw new Error(response.data.message)
      }
      result=response.data.data;
      console.log(result)
      
      //console.log(response.data.data.courses);
      
    } catch (error) {
      console.log(error);
      //toast.error("Failed to fetch enrolled courses")
    }
    //toast.dismiss(toastId);
    return result;
  }
}