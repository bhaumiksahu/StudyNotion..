const mongoose=require("mongoose");

const CourseProgressSchema= new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    },
    completeVideo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection"
    }],
});

module.exports=mongoose.model("CourseProgress",CourseProgressSchema);