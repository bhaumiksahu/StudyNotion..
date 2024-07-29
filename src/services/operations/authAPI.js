import toast from "react-hot-toast";
import { setLoading } from "../../slices/authSlice"
import { apiConnector } from "../apiconnector";
import { endPoint } from "../apis";
import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";


export const signUp=(firstName,lastName,email,password,confirmPassword,accountType,otp,navigate)=>{
        return async (dispatch)=>{
            dispatch(setLoading(true))
            //const toastId=toast.loading("loading...");
            try {
                const response=await apiConnector("POST",endPoint.SIGNUP_API,{
                    firstName,lastName,email,password,confirmPassword,accountType,otp
                })
                if(!response.data.success){
                    throw new Error(response.data.message)
                }
                toast.success("Signup successful")
                navigate("/login")
            }catch(error){
                console.log(error)
                toast.error("Signup Failed")
                navigate("/signup")
            }
            //toast.dismiss(toastId)
            dispatch(setLoading(false));
        }
}

export const login=(email,password,navigate)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true))
        try {
            const response=await apiConnector("POST",endPoint.LOGIN_API,{email,password});
            if(!response.data.success){
                toast.error(response.data.message)
            }
            toast.success("login successful")
            dispatch(setToken(response.data.token))

            const Uimage=response?.data?.user?.image ?
            response.data.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

            dispatch(setUser({ ...response.data.user, image:Uimage }))

            localStorage.setItem("token", JSON.stringify(response.data.token))

            localStorage.setItem("user",
            JSON.stringify(response.data.user)
            )

            navigate("/dashboard/my-profile")
            }
             catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
          }
          dispatch(setLoading(false))
    }
}

export const sentOtp=(email,navigate)=>{
    return async (dispatch)=>{
        dispatch(setLoading(true))
       // const toastId=toast.loading("Loading..");
        try {
            const response=await apiConnector("POST",endPoint.SENDOTP_API,{email});
            if(!response.data.success){
               // throw new Error(response.data.message) 
               toast.error(response.data.message)  

            }
            toast.success("OTP Sent successfully")
            navigate("/verify-email")
        }catch(error){
            toast.error(error.message)
        }
        dispatch(setLoading(false));
        //toast.dismiss(toastId)
    }
}

export const getPasswordResetToken=(email,setEmailSent)=>{
    return async (dispatch)=>{
        dispatch(setLoading(true));
        try {
            const response=await apiConnector("POST",endPoint.RESETPASSWORDTOKEN_API,{email});
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Reset Email Sent");
            setEmailSent(true);
        }catch(error){
            toast.error("fail to sent otp while resetting password")
            console.log("reset failed")
            console.log(error.message);
        }
        dispatch(setLoading(false));
    }
}

export const resetPassword=(password,confirmPassword,token)=>{
    return async (dispatch)=>{
    dispatch(setLoading(true));
    try {
        const response=await apiConnector("POST",endPoint.RESETPASSWORD_API,{password,confirmPassword,token});
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("Password Reset successfully")
    }
     catch (error) {
        toast.error("fail to reset password")
        console.log("reset failed")
        console.log(error.message);
    }
    dispatch(setLoading(false));
}
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      //dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
}
