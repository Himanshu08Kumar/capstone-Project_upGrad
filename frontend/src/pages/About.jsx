import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to HealthCare Connect, your trusted partner in ensuring quality medical assistance. We are dedicated to simplifying healthcare access by connecting patients with experienced doctors across various specialties. Our platform ensures seamless appointment booking, providing timely and reliable medical solutions.</p>

          <p>With a focus on patient satisfaction, we strive to deliver personalized care and an intuitive user experience. From general consultations to specialized treatments, HealthCare Connect is here to make healthcare more accessible, efficient, and tailored to your needs.</p>

          <b className='text-gray-800'>Our Vision</b>

          <p>To revolutionize healthcare by bridging the gap between patients and doctors through innovation and technology, ensuring everyone has access to quality medical care anytime, anywhere.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>Swift access to expert medical care.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE:</b>
          <p>Hassle-free appointment booking anytime.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZATION:</b>
          <p>Tailored healthcare solutions for every need.</p>
        </div>

      </div>
    </div>
  )
}

export default About
