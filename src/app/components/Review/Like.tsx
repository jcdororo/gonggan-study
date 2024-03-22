"use client";
import axios from "axios";
import { ObjectId } from "mongodb";
import React from "react";
import { useEffect, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { ReviewType, UserInfoType } from "../../interface";
import { sendAlarm } from "@/util/sendAlarm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LikeProps {
  review: ReviewType;
}

interface ReviewLikeProps {
  review_id: ObjectId;
  liked_user: ObjectId;
  canceled: boolean;
}

export default function Like({ review }: LikeProps) {
  const { data: userData } = useSession();

  const [isLike, setIsLike] = useState<boolean>();
  const [like, setLike] = useState();

  const router = useRouter();

  const getLikedUser = async () => {
    // 현재 유저가 현재 장소에 좋아요를 눌렀는지
    const { data } = await axios.get(
      `/api/review/getLikedUser?review_id=${review._id}&liked_user=${userData?.user.id}`
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
    const { data } = await axios.get(
      `/api/review/getLike?review_id=${review._id}`
    );
    setLike(data.length);
  };

  useEffect(() => {
    getLike();
    getLikedUser();
  }, [isLike, userData]);

  const onClick = async () => {
    try {
      if (isLike) {
        // 좋아요 삭제
        await axios.post(
          `/api/review/createLike?review_id=${review._id}&liked_user=${userData?.user.id}`
        );
        setIsLike(!isLike);
      } else {
        // 좋아요 생성
        const response = await axios.post(
          `/api/review/createLike?review_id=${review._id}&liked_user=${userData?.user.id}`
        );
        setIsLike(!isLike);
      }
    } catch (error) {
      throw new Error(error?.toString());      
    }
  };

  return (
    <>
      <div className="">
        <div onClick={onClick}>
          {isLike ? (
            <div className="cursor-pointer">
              <BiSolidLike size="25" />
            </div>
          ) : (
            <div className="cursor-pointer">
              <BiLike size="25" />
            </div>
          )}
        </div>

        <div className="text-xs text-center mt-1">{like}</div>
      </div>
    </>
  );
}
