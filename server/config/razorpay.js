const Razorpay =require("razorpay");
const RAZORPAY_KEY = "rzp_test_fUIZAI25WMgGwi"

const RAZORPAY_SECRET = "o7TBIxOogcPsNQa9pTzsAoYf"
//RAZORPAY_KEY=rzp_test_W5AOM1xbET62gd
//RAZORPAY_SECRET=thOt0tg7P6fPzF3ywy5cwhM
exports.instance=new Razorpay({
    key_id:RAZORPAY_KEY,
    key_secret:RAZORPAY_SECRET,
})