'use client'
import React, { useState } from 'react'
import { FaThumbsUp } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io'

export interface PlaceProps {
  _id: string;
  location: string;
  openhour: string;
  closehour: string;
  buisinessday?: string | [];
  phone?: string | [];
  howtouse: string;
  desc: string;
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  id: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
  status: string;
  like?: number | undefined
}

interface Props {
  result: PlaceProps[]; // 'result' 프로퍼티를 정의
}

const Place = ({result}: Props) => {
  const [num, setNum] = useState(3)

  const handleClick = () => {
    setNum(Math.min(num+3,10))
  }
  return (
    <div>
      {
        result.map((x,i) => (
          
          i < num 
          ?
          <div key={x._id} className="flex flex-row m-3">
            <div className="text-xl font-semibold mx-1">{x.place_name.length >= 10 ?x.place_name.slice(0,8)+'...':x.place_name}</div>
            <div className="text-sm mt-1.5 ml-1 text-sygnature-brown">{x.category_group_name}</div>
            <div className="absolute right-7 mt-1.5 text-sygnature-brown flex flex-row items-center gap-1"><FaThumbsUp />{x.like}</div>
          </div>
          :
          ''
        ))
      }
      <div 
        className="flex flex-row justify-center items-center cursor-pointer hover:font-bold" 
        onClick={handleClick}
      >
        <div className="mx-2" >더 보기</div>
        <IoIosArrowDown />        
      </div>
    </div>
  )
}

export default Place