const Course=require("../models/Course")
const Category=require("../models/Category");
const User=require("../models/User");
const {uploadImage}=require("../utils/imageUploader");
require("dotenv").config();
const Section = require("../models/Section");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");
//createCourse
exports.createCourse=async(req,res)=>{
    try {
        let {price,category,courseName,courseDescription,whatYouWillLearn, 
          tag:_tag,
          status,
          instructions:_instructions}=req.body;

        const thumbnail=req.files.thumbnailImage;
        // Convert the tag and instructions from stringified Array to Array
        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)
        if(!courseName || !courseDescription||!whatYouWillLearn || !thumbnail || !price || !category ||  !tag.length || !instructions.length){
        return res.status(400).json({
            success:false,
            message:"All fields are required",
        })
    }

    if (!status || status === undefined) {
      status = "Draft"
    }

    const userId=req.user.id;
    const InstructorDetail=await User.findById(userId,{ accountType: "Instructor",});

    if(!InstructorDetail){ 
        return res.status(404).json({
            success:false,
            message:"Instructor not found",
        })
    }
    const CategoryDetails=await Category.findById(category);

    if(!CategoryDetails){
        return res.status(404).json({
            success:false,
            message:"CategoryDetail Not Found",
        })
    }
    const thumbnailImage=await uploadImage(thumbnail,process.env.FOLDER_NAME);
    

    const newCourse=await Course.create({
        courseName,
        courseDescription,
        instructor:InstructorDetail._id,
        whatYouWillLearn:whatYouWillLearn,
        price,
        tag,
        category:CategoryDetails._id,
        thumbnail:thumbnailImage.secure_url,
        status: status,
        instructions,
    })
    console.log("Course "+newCourse);
    //add the new course to user schema of instructor
    await User.findByIdAndUpdate({_id:InstructorDetail._id},
        {
            $push:{
                courses:newCourse._id,
            }
        },
        {new:true}
    )
    //update tag schema
    const categoryDetails2 =await Category.findByIdAndUpdate
    (   {_id:category},
        {
            $push:{
                course:newCourse._id,
            }
        },
        {new:true}
    )
    return res.status(200).json({
        success:true,
        newCourse,
        message:"Course Created Successful",
        
    })
    } 
    catch(error){   
      return res.status(500).json({
        success:false,
        message:"Course Created unSuccessful",
        error:error.message
    })
    }
}

//getallCourse
exports.getallCourse=async(req,res)=>{
    try {
        const allCourses=await Course.find({status: "Published"},
            {   courseName:true,
                price:true,
                thumbnail:true,
                instructor:true,
                ratingAndReview:true,
                studentEnrolled:true,
            }
        ).populate("instructor").exec();
        return res.status(200).json({
            success:true,
            data: allCourses,
            message:"Data Found of all courses",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"cannot fetch course data",
        })
    }
} 

//courseDetail
exports.courseDetailed=async(req,res)=>{
    try {
        const {courseId}=req.body;

        const courseDetail=await Course.findOne({_id:courseId})
        .populate({
            path:"instructor",
            populate:{
                path:"additionalDetail"
            }
        })
        .populate("category")
        .populate("ratingReviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
                select: "-videoUrl",
            }
        }).exec();
        if(!courseDetail){
            return res.status(400).json({
                success:false,
                message:"cannot fetch course data",
            })
        }
        let totalDurationInSeconds = 0
        courseDetail.courseContent.forEach((content) => {
          content.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
          })
        })
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
        return res.status(200).json({
            success:true,
            courseDetail,
            totalDuration,
            message:" fetch course data",
        })
    } 
    catch(error){
        return res.status(500).json({
            success:false,
            message:"cannot fetch course data",
        })
    }
}

//getFullCourseDetails
exports.getFullCourseDetails=async(req,res)=>{
    try {
        const { courseId } = req.body
        const userId = req.user.id
        const courseDetails = await Course.findOne({
          _id: courseId,
        })
          .populate({
            path: "instructor",
            populate: {
              path: "additionalDetail",
            },
          })
          .populate("category")
          .populate("ratingReviews")
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          })
          .exec()
    
        let courseProgressCount = await CourseProgress.findOne({
          courseID: courseId,
          userId: userId,
        })
    
        console.log("courseProgressCount : ", courseProgressCount)
    
        if (!courseDetails) {
          return res.status(400).json({
            success: false,
            message: `Could not find course with id: ${courseId}`,
          })
        }
    
        // if (courseDetails.status === "Draft") {
        //   return res.status(403).json({
        //     success: false,
        //     message: `Accessing a draft course is forbidden`,
        //   });
        // }
    
        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
          content.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
          })
        })
    
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
    
        return res.status(200).json({
          success: true,
          data: {
            courseDetails,
            totalDuration,
            completedVideos: courseProgressCount?.completedVideos
              ? courseProgressCount?.completedVideos
              : [],
          },
        })
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        })
      }
}

//getInstructorCourses
exports.getInstructorCourses=async(req,res)=>{
    try {
        // Get the instructor ID from the authenticated user or request body
        const instructorId = req.user.id
    
        // Find all courses belonging to the instructor
        const instructorCourses = await Course.find({
          instructor: instructorId,
        }).sort({ createdAt: -1 })
    
        // Return the instructor's courses
        res.status(200).json({
          success: true,
          data: instructorCourses,
        })
      } catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Failed to retrieve instructor courses",
          error: error.message,
        })
      }
}

//deleteCourse
exports.deleteCourse = async(req, res) => {
    try {
        const { courseId } = req.body
    
        // Find the course
        const course = await Course.findById(courseId)
        if (!course) {
          return res.status(404).json({ message: "Course not found" })
        }
    
        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnroled
        for (const studentId of studentsEnrolled) {
          await User.findByIdAndUpdate(studentId, {
            $pull: { courses: courseId },
          })
        }
    
        // Delete sections and sub-sections
        const courseSections = course.courseContent
        for (const sectionId of courseSections) {
          // Delete sub-sections of the section
          const section = await Section.findById(sectionId)
          if (section) {
            const subSections = section.subSection
            for (const subSectionId of subSections) {
              await SubSection.findByIdAndDelete(subSectionId)
            }
          }
    
          // Delete the section
          await Section.findByIdAndDelete(sectionId)
        }
    
        // Delete the course
        await Course.findByIdAndDelete(courseId)
    
        return res.status(200).json({
          success: true,
          message: "Course deleted successfully",
        })
      } catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "Server error",
          error: error.message,
        })
      }
}

//editCourse
exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImage(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetail",
          },
        })
        .populate("category")
        .populate("ratingReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
}