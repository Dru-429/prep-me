import { getTechLogos } from '@/lib/utils'
import React from 'react'
import Image from 'next/image'


const DisplayTechIcon = async ({ techStack }: TechIconProps) => {

    const techIcons = await getTechLogos(techStack)

    return (
        <div className='flex flex-row ' >
            {
                techIcons.slice(0, 3).map(({ tech, url }, index) => (
                    <div
                        key={index}
                        // className={cn(`relative group bg-dark-300 p-2 flex justify-center items-center rounded-full`, index >= 1 && '-ml-3')}
                        className={`relative group bg-dark-300 p-2 flex justify-center items-center rounded-full m-1`}
                    >
                        <span className='tech-tooltip'>{tech}</span>
                        <Image 
                            src={url}
                            alt='tech '
                            width={100}
                            height={100}
                            className='object-fit size-5'
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default DisplayTechIcon