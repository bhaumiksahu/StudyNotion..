// Import the required modules
const express = require("express")
const router = express.Router()
const {
  capturePayment,
  verifySignature,
  verifyPayment,
  sendPaymentSuccessEmail,
} = require("../controllers/Payments")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
 router.post("/capturePayment", auth, capturePayment)
router.post("/verifyPayment", auth, isStudent, verifyPayment)
router.post( "/sendPaymentSuccessEmail",auth,isStudent,sendPaymentSuccessEmail)
//router.post("/verifySignature", verifySignature)

module.exports = router