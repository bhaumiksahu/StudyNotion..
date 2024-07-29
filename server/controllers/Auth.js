const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const Profile=require("../models/Profile");
const jwt=require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/template/passwordUpdate")
require("dotenv").config();
// sendOTP
exports.sendotp=async (req,res)=>{
    try {
        //fetch email from req body
        const {email}=req.body;
        //check if user already registered
        const user=await User.findOne({email});
    
        if(user){
            return res.status(401).json({
               success:false,
               error:"User Already Exist",
               message:"User Already Exist" 
            })
        } 
        //generate otp 
        var otp= otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })
        //check unquie otp generated 
        const result=await OTP.findOne({otp:otp});
        //unquie otp not generated then find unquie until not get
        while(result){
            otp=otpGenerator.generate(6,{
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
                specialChars:false,
            });
            // result=await OTP.findOne({otp});
        }
        const payload ={email,otp};
        //create entry in Db
        const otpBody=await OTP.create(payload);
        //return response
        res.status(200).json({
            otpBody,
            success:true,
            message:"OTP sent successfully",
        });
    } 
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message, 
        }) 
    }
}

// signUP
exports.signup=async (req,res) =>{
    try {
        //fetch the data from req body
        const{firstName,lastName,email,password,confirmPassword,accountType,contactNumber,otp}=req.body;
        //validate
        if(!firstName || !lastName || !email || !password  ||!confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            })
        }
        //check confirmpsd and psd are same
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password and confirmPassword value are not same",
            })
        }
        //check user already exist
        const user=await User.findOne({email});
        //user exist
        if(user){
            return res.status(401).json({
                success:false,
                message:"User is already registered",
            })
        }
        // Find most recent OTP
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(otp + " != " + recentOtp[0].otp);

        // Validate OTP
        if (recentOtp.length === 0) {
        // Not found
           return res.status(402).json({
           success: false,
           message: "Otp not found",
        });
        } else if (otp !== recentOtp[0].otp) {
          console.log(otp + " != " + recentOtp[0].otp);
          return res.status(406).json({
          success: false,
          message: "Invalid Otp",
        });
        }
        //hash password
        const hashedpassword=await bcrypt.hash(password,10);
        //create entry in Db
        const profileDetails=await Profile.create({
            dateOfBirth:null,
            gender:null,
            contactNumber:null,
            about:null
        })
        const USER= await User.create({
            email,
            firstName,lastName,password:hashedpassword,
            accountType,contactNumber,additionalDetail:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })
        return res.status(200).json({
            success:true,
            user:USER,
            message:"User is registered successful"
        })
    } 
    catch(error){
        return res.status(500).json({
            success:false,
            //message:"User failed to registered"
            message:error.message,
            //console.log(error.message)
        })
    }
}

// login
exports.login=async(req,res)=>{
try {
        const{email,password}=req.body;

    if(!email || !password){
        return res.status(403).json({
            success:false,
            message:"Please fill all detail",
        });
    }
    const user=await User.findOne({email}).populate("additionalDetail"); 
    if(!user){
        return res.status(401).json({
            success:false,
            message:"User not registered",
        });
    }
    
    if(await bcrypt.compare(password,user.password)){
        const payload={
            email:user.email,
            id:user._id,
            accountType:user.accountType
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h"
        })

       
        user.token=token;
        user.password=undefined;

        //create cookie
        const options={
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            user,
            token,
            message:"User logged in Successful"
        })
    }else{
        return res.status(401).json({
            success:false,
            message:"Password is incorrect",
        });
    }
}catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

//changePassword
exports.changePassword = async (req, res) => {
    try {
      // Get user data from req.user
      const userDetails = await User.findById(req.user.id)
  
      // Get old password, new password, and confirm new password from req.body
      const { oldPassword, newPassword } = req.body
  
      // Validate old password
      console.log( oldPassword+"      "+userDetails.password)
      const isPasswordMatch = await bcrypt.compare(
        oldPassword,
        userDetails.password
      )

      if (!isPasswordMatch) {
        // If old password does not match, return a 401 (Unauthorized) error
        return res
          .status(401)
          .json({ success: false, message: "The password is incorrect" })
      }
  
      // Update password
      const encryptedPassword = await bcrypt.hash(newPassword, 10)
      const updatedUserDetails = await User.findByIdAndUpdate(
        req.user.id,
        { password: encryptedPassword },
        { new: true }
      )
  
      // Send notification email
      try {
        const emailResponse = await mailSender(
          updatedUserDetails.email,
          "Password for your account has been updated",
          passwordUpdated(
            updatedUserDetails.email,
            `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
          )
        )
      } catch (error) {
        // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while sending email:", error)
        return res.status(500).json({
          success: false,
          message: "Error occurred while sending email",
          error: error.message,
        })
      }
  
      // Return success response
      return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" })
    } catch (error) {
      // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while updating password:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while updating password",
        error: error.message,
      })
    }
  }