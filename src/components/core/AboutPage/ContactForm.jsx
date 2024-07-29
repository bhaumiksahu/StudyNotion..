import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

const ContactForm = () => {
  return (
    <div className="border-[0.1px] border-richblack-700 text-richblack-300 rounded-xl p-7 flex gap-3 flex-col sm:w-[500px] mx-auto w-[90%]">
       <h1 className="mx-auto text-4xl leading-10 font-semibold text-richblack-5">Get in Touch</h1>
       <p className='mx-auto'>We'd love to here for you, Please fill out this form.</p>
       <div className="mt-7">
        <ContactUsForm/>
       </div>
    </div>
  )
}

export default ContactForm
