import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import InterviewCard from '../components/InterviewCard'

const HomePage = () => {
  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>
            Get Interview-Ready with AI-Powered Mock Interviews & Instant Feedback 
          </h2>
          <p>
            Pratice with real interview questions and get instant feedback on your performance.
          </p>

          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href='/interview'>
              Start an Interview
            </Link>
          </Button>
        </div>

          <Image 
            src = "/robot.png"
            alt = 'robot'
            width = {400}
            height = {400}
            className='max-sm:hidden'
          />

      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2> 
          Your Interviews
        </h2>  

        <div className='interviews-section'>
          {/* <p> You haven&apos;t taken any interviews yet</p> */}
          {
            dummyInterviews.map((interview,index) => (
              <InterviewCard {...interview } key={index} />
            ))
          }
        </div>

      </section>
      
      <section className='flex flex-col gap-6 mt-8'> 
        <h2>Take an Interviews</h2>

        <div className='interviews-section'>
          {/* <p>There are no interviews available</p> */}
          {
            dummyInterviews.map((interview,index) => (
              <InterviewCard {...interview } key={index} />
            ))
          }
        </div>
      </section>
    </>
  )
}
 
export default HomePage