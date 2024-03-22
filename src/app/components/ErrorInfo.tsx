'use client'
import React from 'react'
import { useRouter } from "next/navigation";

interface Reset {
  reset:() => void
}

const ErrorInfo = ({reset}:Reset) => {
  const router = useRouter()

  setTimeout(() => {
    router.push('/')
  }, 1000);
  return (
    <div className="h-96 flex flex-col justify-center items-center font-bold text-2xl text-sygnature-brown">
        <div>
          세션 오류발생 <br />
          <br /><br />
        </div>

        <div>잠시 후 메인 페이지로 이동합니다. 
          <span 
            className='text-blue-500 cursor-pointer hover:underline hover:opacity-80'
            onClick={reset}
            > 새로고침
          </span>
        </div>
      </div>
  )
}

export default ErrorInfo