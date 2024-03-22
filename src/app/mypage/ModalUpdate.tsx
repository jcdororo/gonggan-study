'use client'
import clsx from 'clsx';
import React, { useEffect, useState } from 'react'



const ModalUpdate = ({handleUpdate, targetContent}:any) => {
  const [value, setValue] = useState('');
  const [star, setStar] = useState(0)
  
  
  useEffect(() => {
    setValue(targetContent.content)
    setStar(targetContent.star)
  }, [])

  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setValue(e.target.value);
  }

  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const childSpans = (e.target as HTMLElement).querySelectorAll('span');
    const numberOfSpans = childSpans.length;
    setStar(5 - numberOfSpans);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      newContent : value,
      reviewid: targetContent._id,
      placeid: targetContent.placeid,
      writerid: targetContent.writerid,
      star: star
    }
    const result = await fetch("/api/review/updateReview",{method:'POST',body:JSON.stringify(body)}).then(r=>r.json()).then(r => window.location.reload())


  }
  
  
  return (
    <div>
      <form 
        // action="/api/review/updateReview"
        // method='POST'
        onSubmit={handleSubmit}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center 
        xs:-inset-full 
        md:inset-0"
      >
          <div className="bg-white py-4 px-5 mx-2 rounded-lg w-96">
            <div className='my-2 text-lg font-semibold text-center'>
              {targetContent.placename}
            </div>
            
            <div className='my-2 font-bold flex justify-center text-2xl cursor-pointer'>
            <span className={clsx('hover:text-sygnature-brown',{                        
                        'text-blue-100' : star < 1,
                        'text-sygnature-brown' : star >= 1
                      })} onClick={(e) => {handleClick(e)}} >                 
                      ★
                <span className={clsx('hover:text-sygnature-brown',{                        
                        'text-blue-100' : star < 2,
                        'text-sygnature-brown' : star >= 2
                      })} >                  
                      ★
                  <span className={clsx('hover:text-sygnature-brown',{                        
                        'text-blue-100' : star < 3,
                        'text-sygnature-brown' : star >= 3
                      })} >                    
                      ★
                    <span className={clsx('hover:text-sygnature-brown',{                        
                        'text-blue-100' : star < 4,
                        'text-sygnature-brown' : star >= 4
                      })} >
                      ★
                      <span className={clsx('hover:text-sygnature-brown',{                        
                        'text-blue-100' : star < 5,
                        'text-sygnature-brown' : star >= 5
                      })} >
                      ★
                      </span>
                    </span>
                  </span>
                </span>
              </span>
              
              
              
            </div>
            <div className='my-2 font-bold flex justify-center text-2xl'>
              {star}점
            </div>
            

            <textarea 
              className='flex flex-col border border-black rounded-md my-2 w-92 h-32 p-1 resize-none'
              value={value}
              onChange={handleChange}
              name='newContent'              
            />
           

            <div className='flex items-center justify-center text-sm font-bold'>
              <div className='cursor-pointer px-8 py-1 m-3 border-2 border-sygnature-brown text-sygnature-brown rounded-md hover:opacity-80' onClick={handleUpdate}>
                취소하기
              </div>
              <button
                type='submit'
                className='w-32 h-8 font-bold mx-1 text-white bg-sygnature-brown border rounded-md align-middle text-base hover:opacity-80'
              >
                수정하기
              </button>
            </div>
          </div>

          
          <input 
            className='hidden'
            name='placeid'
            value={targetContent.placeid}
            onChange={()=>{}}
          />
          <input 
            className='hidden'
            name='writerid'
            value={targetContent.writerid}
            onChange={()=>{}}
          />
          <input 
            className='hidden'
            name='star'
            value={star}
            onChange={()=>{}}
          />

      </form>
    </div>  )
}

export default ModalUpdate