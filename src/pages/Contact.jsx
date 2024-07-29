import React from 'react'
import ContactPageForm from '../components/core/ContactPage/ContactPageForm'
import ContactDetails from '../components/core/ContactPage/ContactDetails'
import Footer from '../components/common/Footer'

const Contact = () => {
  return (
    <div>
       <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
          <div className="lg:w-[40%]">
            <ContactDetails />
          </div>

        {/* Contact Form */}
          <div className="lg:w-[60%]">
            <ContactPageForm/>
          </div>

      </div>
      {/* Review section */}
      

      {/* Footer Section*/}
      <div className='mt-20'>
        <Footer/>
      </div>
    </div>
  )
}

export default Contact
