const CourseProgress = require("../models/CourseProgress");
const Profile=require("../models/Profile");
const User = require("../models/User");
const {uploadImage}=require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
exports.updateProfile=async(req,res)=>{
    try {
        const {dateOfBirth="",about="",contactNumber,gender}=req.body;

        const userId=req.user.id;

        if(!contactNumber||!gender||!userId){
            return res.status(400).json({
                success:false,
                message:"All details are required"
            })
        }

        const userDetail=await User.findById(userId);
        const ProfileId=userDetail.additionalDetail;
        const profileDetails=await Profile.findById(ProfileId);

        //update profile
        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.gender=gender;
        profileDetails.about=about;
        profileDetails.contactNumber=contactNumber;

        await profileDetails.save();

        return res.status(200).json({
            success:true,
            profileDetails,
            message:"Profile Updated successful"
        })
    } 
    catch(error){
        return res.status(500).json({
            success:false,
            message:"failed to update profile",
            error:error.message
        })
    }
}

exports.deleteAccount=async(req,res)=>{
    try {
        const id=req.user.id;
        const userdetail=await User.findById(id);
        if(!userdetail){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        };
        const profileid=userdetail.additionalDetail;
        await Profile.findByIdAndDelete({_id:profileid});
        //TODO delete from enrol user
        await User.findByIdAndDelete({_id:id});
        return res.status(200).json({
            success:true,
            message:"Deleted Successfully"
        })

    } 
    catch(error){
        return res.status(500).json({
            success:false,
            message:"failed to delete account"
        })
    }
}

exports.getAllUserDetails = async(req,res)=>{
    try{
        const id = req.user.id;

        const userDetail= await User.findById(id).populate("additionalDetail").exec();

        res.status(200).json({
            success:true,
            userDetail, 
            message:"Details fetch Successful"
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"failed to fetch details"
        });
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImage(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
        console.log("reaching..."+error.message)
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}

// exports.getEnrolledCourses=async(req,res)=>{
//     try {
//         const userId=req.user.id;
//         const userDetail=await User.findOne( {_id:userId})
//         .populate({
//             path: "courses",
//             populate: {
//               path: "courseContent",
//               populate: {
//                 path: "subSection",
//               },
//             },
//           }).exec();
//           userDetail = userDetail.toObject()
//         console.log(userDetail);
//         if(!userDetail){
//             console.log("user not found");
//             return res.status(404).json({
//                 success:false,
//                 message:"User Not found"
//             })
//         }
//         return res.status(200).json({
//             success:true,
//             data:userDetail,
//         })

//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:error
//         })
//     }
// }
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path: "courses",
          populate: {
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          },
        })
        .exec()
      userDetails = userDetails.toObject()
      var SubsectionLength = 0
      for (var i = 0; i < userDetails.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0
        for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
          totalDurationInSeconds += userDetails.courses[i].courseContent[
            j
          ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
          userDetails.courses[i].totalDuration = convertSecondsToDuration(
            totalDurationInSeconds
          )
          SubsectionLength +=
            userDetails.courses[i].courseContent[j].subSection.length
        }
        let courseProgressCount = await CourseProgress.findOne({
          courseID: userDetails.courses[i]._id,
          userId: userId,
        })
        courseProgressCount = courseProgressCount?.completedVideos.length
        if (SubsectionLength === 0) {
          userDetails.courses[i].progressPercentage = 100
        } else {
          // To make it up to 2 decimal point
          const multiplier = Math.pow(10, 2)
          userDetails.courses[i].progressPercentage =
            Math.round(
              (courseProgressCount / SubsectionLength) * 100 * multiplier
            ) / multiplier
        }
      }
  
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  
//   exports.instructorDashboard = async (req, res) => {
//     try {
//       const courseDetails = await Course.find({ instructor: req.user.id })
  
//       const courseData = courseDetails.map((course) => {
//         const totalStudentsEnrolled = course.studentsEnroled.length
//         const totalAmountGenerated = totalStudentsEnrolled * course.price
  
//         // Create a new object with the additional fields
//         const courseDataWithStats = {
//           _id: course._id,
//           courseName: course.courseName,
//           courseDescription: course.courseDescription,
//           // Include other course properties as needed
//           totalStudentsEnrolled,
//           totalAmountGenerated,
//         }
  
//         return courseDataWithStats
//       })
  
//       res.status(200).json({ courses: courseData })
//     } catch (error) {
//       console.error(error)
//       res.status(500).json({ message: "Server Error" })
//     }
//   }
  