'use client'
import { ObjectId } from 'mongodb'
import React, { useState } from 'react'
import Title from '../Title'
import SpinWhite from '../SpinWhite'

interface Props {
  users: {
    _id: ObjectId,
    loginId: string,
    nickname: string,
    password: string,
    id: string,
    email: string,
    role: string,
    method: string,
    image: string,
    emailVerified: string
  }[]
}



const Role = ({users}:Props) => {
  const [usersInfo, setUsersInfo] = useState(users)
  const [isLoading, setisLoading] = useState(false)

  const handleClick = async (e:React.MouseEvent<HTMLDivElement>, _id:string, index:number, role:string) => {
    setisLoading(true)
    const result = await fetch(`/api/user/changeRole?_id=${_id}&role=${role}`,{method:'POST'})
    .then(r=>r.json())
    .then(r=>{
      const temp = usersInfo
      temp[index].role = temp[index].role == 'user' ? 'admin' : 'user'
      setUsersInfo(temp);
    })    
    setisLoading(false)
  }
  return (
    <div>
      <Title type="유저 권한 목록" />
      <div className="max-w-6xl mx-auto">
        <div className="darkMode p-4">
          <table className="w-full">
            <thead>
              <tr className="h-14 border-y-2 border-sygnature-brown">
                <th className="py-2 w-28 ">권한</th>
                <th className="py-2 w-96">_id</th>
                <th className="py-2 w-48">닉네임</th>
                <th className="py-2 w-44 ">메소드</th>
              </tr>
            </thead>

            <tbody className="">
              {usersInfo.map((x, i) => (
                <tr key={x._id.toString()} className="h-10">
                  <td>
                    <div className="flex justify-center items-center">
                      <div 
                        className="flex justify-center items-center bg-sygnature-brown rounded-2xl h-8 w-16 text-sm text-white cursor-pointer"
                        onClick={(e) => handleClick(e, x._id.toString(), i, x.role)}
                      >                      
                      {
                        isLoading
                        ?
                        <SpinWhite />
                        :
                        x.role
                      }  
                      </div>
                    </div>                    
                  </td>
                  <td className="py-4 pl-10">
                    {x._id.toString()}
                  </td>
                  <td className="py-2 hover:underline cursor-pointer text-center">
                    {x.nickname}
                  </td>
                  <td className="py-2 text-center">
                    {x.method}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Role