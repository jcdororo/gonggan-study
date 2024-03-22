'use client'
import React, { useState } from 'react'


interface ModalProps {
  handlePolice?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const ModalPolice: React.FC<ModalProps> = () => {

  const [modalPoliceOpen, setModalPoliceOpen] = useState(false)

  const handlePolice: React.MouseEventHandler<HTMLDivElement> | undefined = ():void => {
    setModalPoliceOpen(!modalPoliceOpen);
  }
  
  return (
    <div>
      <div className="flex justify-center">
          <div 
            className='flex justify-center items-center w-100 h-14 font-bold my-8 mx-2 text-xl rounded-lg bg-sygnature-brown text-white cursor-pointer'
            onClick={handlePolice}
          >
            신고 하기
          </div>
        </div>



      {
        modalPoliceOpen
        ?
        <div 
         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
        <div className="bg-white p-8 rounded-lg w-96 h-40">
          <div className='text-center my-2 text-sm font-semibold'>
            신고 내용을 등록하시겠습니까?
          </div>

          <div className='flex items-center justify-center mt-5 text-sm font-bold'>
            <div className='cursor-pointer px-8 py-1 m-3 border-2 border-sygnature-brown text-sygnature-brown rounded-md ' onClick={handlePolice}>
              취소하기
            </div>
            <div className='cursor-pointer px-8 py-1 m-3 bg-sygnature-brown border border-sygnature-brown text-white rounded-md '>
              등록하기
            </div>
          </div>
        </div>
      </div>
        :
        ''
      }
      
    </div>
  )
}

export default ModalPolice