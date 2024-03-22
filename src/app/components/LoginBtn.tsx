'use client'

import React from 'react'
import { signIn } from "next-auth/react";


const LoginBtn = () => {
  return (
    <div className='cursor-pointer' onClick={() => {signIn()}}>로그인</div>
    
  )
}

export default LoginBtn