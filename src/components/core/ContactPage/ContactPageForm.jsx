import React from 'react'
import ContactUsForm from './ContactUsForm'

const ContactPageForm = () => {
  return (
    <div className="border-[0.1px] border-richblack-700 text-richblack-300 rounded-xl p-7 flex gap-3 flex-col  mx-auto w-[100%]">
       <h1 className="mx-auto text-4xl leading-10 font-semibold text-richblack-5">Got a Idea? We've got the skills. Let's team up</h1>
       <p className='mx-auto'>Tell us more about yourself and what you're got in mind.</p>
       <div className="mt-7">
        <ContactUsForm/>
       </div>
    </div>
  )
}

export default ContactPageForm
