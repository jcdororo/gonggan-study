'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaHandPointLeft } from 'react-icons/fa'

const Info3 = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsVisible(scrollY > 2580);

    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='overflow-hidden'>
      {/* 스타벅스 강남R점 검색 결과 없음 */}
      <div className={`xs:w-[350px] md:w-[400px] h-auto absolute top-[8rem] ${`transform ${isVisible ? 'translate-y-0 opacity-100 xs:-translate-y-12 md:translate-y-0' : '-translate-y-[16rem] opacity-0'} transition-all duration-[2500ms] ease-in-out -mt-14`}} 
      xs:scale-[45%] xs:-translate-x-[6rem] xs:top-[115px]
      md:scale-75 md:-translate-x-36 md:top-[115px]`}>
        <Image
          src={'/main/noresult.png'} 
          width={400}
          height={100}
          alt='propose' 
          className='rounded-2xl w-full h-auto'
        />  
        {/* 장소 제안하기 화살표 */}
        <div className='absolute bottom-[0.9rem] right-32 animate-[wiggle_1s_ease-in-out_infinite] text-sygnature-brown 
        xs:right-28 xs:bottom-[0.8rem] 
        md:right-32 md:bottom-[0.9rem]'
        >
          <FaHandPointLeft />
        </div>
      </div>
      {/* 장소 제안하기  */}
      <div className={`absolute top-6 translate-x-44 
      ${`transform ${isVisible ? 'xs:translate-x-[80px] xs:-translate-y-[90px] md:translate-x-44 md:translate-y-0 opacity-100' : 'xs:translate-y-0 md:translate-x-[70rem] opacity-0'} transition-all duration-[300ms] xs:duration-[300ms] md:duration-[1000ms] ease-in-out -mt-14`}}`}>
        <Image
          src={'/main/propose2.png'} 
          width={479}
          height={838}
          alt='propose' 
          className='rounded-2xl scale-75 xs:scale-50 md:scale-75'
        /> 
      </div>
      <div className={`absolute top-56 -translate-x-40 w-88 h-96 text-right p-0 sm:-translate-x-28
                      ${`transform ${isVisible ? 'translate-y-0 opacity-100 xs:-translate-y-[80px] md:translate-y-0' : 'translate-y-[32rem] opacity-0'} transition-all duration-[2500ms] ease-in-out -mt-14`}}`}>
        <span className='text-5xl text-white'>
          SHAR<span className='font-bold text-black'>E</span><br />
          YOU<span className='font-bold text-black'>R</span><br />
          <div className='translate-x-2 scale-95'>
            STUD<span className='font-bold text-black'>Y</span><br />
          </div>
          <div className='translate-x-1.5 scale-95'>
            SPAC<span className='font-bold text-black'>E</span><br />
          </div>
        </span>
        <span className='text-white'>
          나의 <span className='font-bold'>스터디</span> 장소를 <br />
          <span className='text-sygnature-beige'>工間</span>과 공유하세요 <br />
        </span>
      </div>
    </div>
  )
}

export default Info3