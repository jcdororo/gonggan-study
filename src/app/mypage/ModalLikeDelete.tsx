'use client'

import React from 'react'




const ModalLikeDelete = ({handleDelete, targetContent}:any) => {

  const handlerClick = () => {
    fetch(`/api/like/deleteLike?place_id=${targetContent._id}`, { method : 'DELETE' })
    .then(r => r.json())
    .then(r => window.location.reload())
  }


  return (
    <div>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center
        xs:-inset-y-full xs:-inset-x-1/4
        md:-inset-y-full"
      >
          <div className="bg-white p-8 rounded-lg w-96 h-40">
            <div className='text-center my-2 text-sm font-semibold'>
              좋아요를 삭제 하시겠습니까?
            </div>

            <div className='flex items-center justify-center mt-5 text-sm font-bold'>
              <div 
                className='cursor-pointer px-8 py-1 m-3 border-2 border-sygnature-brown text-sygnature-brown rounded-md hover:opacity-80' 
                onClick={handleDelete}>
                취소하기
              </div>
              <div 
                className='cursor-pointer px-8 py-1 m-3 bg-sygnature-brown border border-sygnature-brown text-white rounded-md hover:opacity-80'
                onClick={handlerClick}
              >

                삭제하기
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default ModalLikeDelete