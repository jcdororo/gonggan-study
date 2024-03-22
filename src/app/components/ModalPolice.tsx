'use client'
import { sendAlarm } from '@/util/sendAlarm';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'



const ModalPolice = ({targetContent, handleWrite}:any) => {
  const [value, setValue] = useState('');
  const [check, setCheck] = useState<string[]>([]);
  const [sendPolice, setSendPolice] = useState(false)
  const userData = useSession() as any




  useEffect(() => {
    setSendPolice(false)
  }, [])
  
  

  const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }

  
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const temp = targetContent;
    const temp = {
      placeid: targetContent.placeid,
      content: targetContent.content,
      writerid: targetContent.writerid,
      placename: targetContent.placename,
      writernickname: targetContent.writernickname,
      writerpic: targetContent.writerpic,
      star: targetContent.star,
      like: targetContent.like,
      policeContent: value,
      check: check,
      status: '진행중',
      date: new Date().toLocaleDateString('ko-KR').toString(),
      reporter: userData.data.user.id

    }
    
    const response = await fetch('/api/police/police',{method:'POST',body:JSON.stringify(temp)}).then(r => r.json());
    const temp2 = {
      check: false,
      content: '[admin] 신고내역 1건이 등록 되었습니다.',
      link: '/admin/police/list',
      receiver: '',
      role: 'admin'
    }
    await sendAlarm(temp2);

    setSendPolice(true);



  }

  const handleCheck = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(check.indexOf(e.target.value) == -1) {
      setCheck([...check,e.target.value])
    } else {
      setCheck([...check.slice(0,check.indexOf(e.target.value)), ...check.slice(check.indexOf(e.target.value)+1, check.length)])
    }
  }
  
  return (
    <div>
      <form 
        onSubmit={handleSubmit}
        method='POST'
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
          <div className="bg-white py-4 px-5 mx-2 rounded-lg w-96">
            {
              sendPolice
              ?
              <div className='h-80 flex flex-col justify-center items-center text-2xl'>
                신고내역이 접수되었습니다.
                <div 
                  id="police"
                  className='cursor-pointer px-8 py-1 m-3 border-2 border-sygnature-brown text-sygnature-brown rounded-md translate-y-8 '
                  onClick={handleWrite}
                >
                  닫기
                </div>
              </div>
              :
              <div>
                <div className='my-2 text-lg font-semibold text-center'>
                  리뷰 신고하기 <br/>
                  대상자 : {targetContent.writernickname}
                </div>       

              <textarea 
                className='flex flex-col border border-black rounded-md my-2 w-92 h-32 p-1 resize-none'
                value={value}
                onChange={handleChange}
                name='newContent'              
              />

              <div className='flex flex-row'>
                <input 
                  type='checkbox' 
                  value={'부정적인 태도'} 
                  onChange={handleCheck}
                  className='w-7 mx-3 accent-sygnature-brown hover:scale-105 transition duration-150'
                />
                <div className='flex flex-row items-center'>
                  부정적인 태도
                </div>
              </div>

              <div className='flex flex-row'>
                <input 
                  type='checkbox' 
                  value={'욕설'} 
                  onChange={handleCheck}
                  className='w-7 mx-3 accent-sygnature-brown hover:scale-105 transition duration-150'
                />
                <div className='flex flex-row items-center'>
                  욕설
                </div>
              </div>           

              <div className='flex flex-row'>
                <input 
                  type='checkbox' 
                  value={'올바르지 않은 정보'} 
                  onChange={handleCheck}
                  className='w-7 mx-3 accent-sygnature-brown hover:scale-105 transition duration-150'
                />
                <div className='flex flex-row items-center'>
                  올바르지 않은 정보
                </div>
              </div>

              <div className='flex flex-row'>
                <input 
                  type='checkbox' 
                  value={'혐오 발언'} 
                  onChange={handleCheck}
                  className='w-7 mx-3 accent-sygnature-brown hover:scale-105 transition duration-150'
                />
                <div className='flex flex-row items-center'>
                  혐오 발언
                </div>
              </div>

              <div className='flex flex-row'>
                <input 
                  type='checkbox' 
                  value={'광고'} 
                  onChange={handleCheck}
                  className='w-7 mx-3 accent-sygnature-brown hover:scale-105 transition duration-150'
                />
                <div className='flex flex-row items-center'>
                  광고
                </div>
              </div>
              

              <div className='flex flex-row'>
                <input 
                  type='checkbox' 
                  value={'불쾌감을 주거나 부적절한 이름 사용'} 
                  onChange={handleCheck}
                  className='w-7 mx-3 accent-sygnature-brown hover:scale-105 transition duration-150'
                />
                <div className='flex flex-row items-center'>
                  불쾌감을 주거나 부적절한 이름 사용
                </div>
              </div>


              <div className='flex items-center justify-center text-sm font-bold'>
                <div 
                  id="police"
                  className='cursor-pointer px-8 py-1 m-3 border-2 border-sygnature-brown text-sygnature-brown rounded-md '
                  onClick={handleWrite}
                >
                  취소하기
                </div>
                <button
                  type='submit'
                  className='w-32 h-8 font-bold mx-1 text-white bg-sygnature-brown border rounded-md align-middle text-base'
                >
                  신고하기
                </button>

              </div>
            </div>            
            }
            
        </div>
          
      </form>
    </div>  
    )
}

export default ModalPolice