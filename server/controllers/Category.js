const Category=require("../models/Category");

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

//creating tag
exports.createCategory=async(req,res)=>{
    try {
        const{name,description}=req.body;
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        const category=await Category.create({
            name:name,
            description:description,
        })
        return res.status(200).json({
            success:true,
            message:"Category created successfully"
        }) 
    } 
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        }) 
    }
}

//show all tag
exports.showAllCategory=async(req,res)=>{
    try {
       const allCategory=await Category.find({},{name:true,description:true,course:true});
       return res.status(200).json({
        success:true,
        allCategory,
        message:"All Category returned Successful"
       }) ;
    } 
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Category not found"
           });
    }
}

//category page detail
// exports.categoryPageDetail=async(req,res)=>{
//     try {
//         //get category id
//         const {categoryId}=req.body;
//         //get course for specific id
//         const selectCategory=await Category.findById(categoryId).populate({
//             path:"course",
//             match: { status: "Published" },
//             populate: "ratingReviews",

//         }).exec();
//         //validate
//         if(!selectCategory){
//             return res.status(404).json({
//                 success:false,
//                 message:"Not found for this  category"
//             })
//         }
//          // Handle the case when there are no courses
//     if (selectCategory.course.length === 0) {
//         console.log("No courses found for the selected category.")
//         return res.status(404).json({
//           success: false,
//           message: "No courses found for the selected category.",
//         })
//       }
  
//       // Get courses for other categories
//       const categoriesExceptSelected = await Category.find({
//         _id: { $ne: categoryId },
//       })
//       let differentCategory = await Category.findOne(
//         categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
//           ._id
//       )
//         .populate({
//           path: "course",
//           match: { status: "Published" },
//         })
//         .exec()
//       console.log()
//       // Get top-selling courses across all categories
//       const allCategories = await Category.find()
//         .populate({
//           path: "course",
//           match: { status: "Published" },
//         })
//         .exec()
//       const allCourses = allCategories.flatMap((category) => category.course)
//       const mostSellingCourses = allCourses
//         .sort((a, b) => b.sold - a.sold)
//         .slice(0, 10)
//         console.log(""+selectCategory);
//         const responseData = {
//           success: true,
//           data: {
//               selectCategory,
//               differentCategory,
//               mostSellingCourses,
//           },
//       };

//       res.status(200).json(responseData)
      
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Internal server error",
//         error: error.message,
//       })
//     }
//   }
exports.categoryPageDetail = async (req, res) => {
  try {
    const { categoryId } = req.body

    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: [
          { path: "ratingReviews" },
          { path: "instructor" }
        ]
        
      })
      .exec()

    console.log("SELECTED COURSE", selectedCategory)
    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Category not found" })
    }
    // Handle the case when there are no courses
    if (selectedCategory.course.length === 0) {
      console.log("No courses found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      })
    }

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    })
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({path: "course",
        match: { status: "Published" },
        populate: [
          { path: "ratingReviews" },
          { path: "instructor" }
        ]
      })
      .exec()
    console.log()
    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({path: "course",
        match: { status: "Published" },
        populate: [
          { path: "ratingReviews" },
          { path: "instructor" }
        ]
      })
      .exec()
    const allCourses = allCategories.flatMap((category) => category.course)
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10)
    

    console.log(JSON.stringify(differentCategory))
    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}