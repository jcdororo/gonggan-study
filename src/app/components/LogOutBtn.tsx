'use client'

import React from 'react'
import { signOut } from "next-auth/react";


const LogOutBtn = () => {
  return (
    <div className='cursor-pointer' onClick={() => {signOut()}}>로그아웃</div>
  )
}

export default LogOutBtn