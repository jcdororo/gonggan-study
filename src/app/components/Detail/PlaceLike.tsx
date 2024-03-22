"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useQuery } from "react-query";

interface PlaceLikeProps {
  _id: string;
}

export default function PlaceLike({ _id }: PlaceLikeProps) {
  const { data: userData } = useSession();

  const [isLike, setIsLike] = useState<boolean>();
  const [like, setLike] = useState();

  const router = useRouter();
  
  const getLikedUser = async () => {

    // 현재 유저가 현재 장소에 좋아요를 눌렀는지
    const { data } = await axios.get(
      `/api/place/getLikedUser?place_id=${_id}&liked_user=${userData?.user._id}`
    );

    if (data == "exist") {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
    router.refresh();
  };

  // 장소의 좋아요들 가져오기
  const getLike = async () => {
    const { data } = await axios.get(`/api/place/getLike?place_id=${_id}`);
    setLike(data.length);
  };

  useEffect(() => {
    getLike();
    getLikedUser();
  }, [isLike, userData]);

  

  // const { data } = useQuery(`getLikeUser`, getLikedUser);

  const onClick = async () => {
    try {
      if (isLike) {
        // 좋아요 삭제
        await axios.post(
          `/api/place/createLike?place_id=${_id}&liked_user=${userData?.user._id}`
        );
        setIsLike(!isLike);
      } else {
        // 좋아요 생성
        const response = await axios.post(
          `/api/place/createLike?place_id=${_id}&liked_user=${userData?.user._id}`
        );
        setIsLike(!isLike);
      }
    } catch (error) {
      throw new Error(error?.toString());      
    }
  };

  return (
    <div className="flex relative mx-4 mb-6">
      <div onClick={onClick} className="absolute right-4">
        {isLike ? (
          <div className="cursor-pointer">
            <FaHeart size="25" color="red" />
          </div>
        ) : (
          <div className="cursor-pointer">
            <FaRegHeart size="25" />
          </div>
        )}
      </div>
      <div className="absolute mt-[2px] font-bold text-sm text-center flex items-center">{like}</div>
    </div>
  );
}
