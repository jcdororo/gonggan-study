'use client'

import Spin from "./Spin"

export default function LoadingSpin() {
  return(
    <div className="h-screen text-9xl flex flex-col justify-center items-center">      
      <Spin />
    </div>
  )
}