"use client";
import { PlaceType, ReviewType } from "@/app/interface";
import axios from "axios";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface ReviewProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  review?: ReviewType;
  _id?: string;
  userData: any;
  type: string;
}

export default function ReviewShape({
  onClick,
  review,
  _id,
  userData,
  type,
}: ReviewProps) {
  const [value, setValue] = useState("");
  const [star, setStar] = useState(0);
  const [place, setPlace] = useState<PlaceType>();

  const router = useRouter();

  useEffect(() => {
    getPlace().then((res) => setPlace(res));
    // review && setValue(review?.content);
    // review && setStar(review?.star);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const childSpans = (e.target as HTMLElement).querySelectorAll("span");
    const numberOfSpans = childSpans.length;
    setStar(5 - numberOfSpans);
  };

  const getPlace = async () => {
    const { data } = await axios.get(`/api/place/route?_id=${_id}`);
    return data as PlaceType;
  };

  const { register, handleSubmit } = useForm({
    mode: "onBlur",
    defaultValues: {
      newContent: review?.content,
    },
  });
  
  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    try {
      // 리뷰 새로 쓸 때
      if (type=="write") {
        await axios.post("/api/review/createReview", {
          ...body,
          writerid: userData.user._id,
          writernickname: userData.user.nickname,
          placeid: _id,
          star: star,
          placename: place?.place_name
        });
      }
      // 리뷰 수정할 때
      if (type=="modify") {
        await axios.post("/api/review/updateReview", {
          ...body,
          star: star,
          reviewid: review?._id
        });
      }
      window.location.reload();
    } catch (error) {
      throw new Error(error?.toString());      
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
      >
        <div className="bg-white py-4 px-5 mx-2 rounded-lg w-96">
          <div className="my-2 text-lg font-semibold text-center">
            {place?.place_name}
          </div>

          <div className="my-2 font-bold flex justify-center text-2xl cursor-pointer">
            <span
              className={clsx("hover:text-sygnature-brown", {
                "text-blue-100": star < 1,
                "text-sygnature-brown": star >= 1,
              })}
              onClick={(e) => {
                handleClick(e);
              }}
            >
              ★
              <span
                className={clsx("hover:text-sygnature-brown", {
                  "text-blue-100": star < 2,
                  "text-sygnature-brown": star >= 2,
                })}
              >
                ★
                <span
                  className={clsx("hover:text-sygnature-brown", {
                    "text-blue-100": star < 3,
                    "text-sygnature-brown": star >= 3,
                  })}
                >
                  ★
                  <span
                    className={clsx("hover:text-sygnature-brown", {
                      "text-blue-100": star < 4,
                      "text-sygnature-brown": star >= 4,
                    })}
                  >
                    ★
                    <span
                      className={clsx("hover:text-sygnature-brown", {
                        "text-blue-100": star < 5,
                        "text-sygnature-brown": star >= 5,
                      })}
                    >
                      ★
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </div>
          <div className="my-2 font-bold flex justify-center text-2xl">
            {star}점
          </div>

          <textarea
            className="flex flex-col border border-black rounded-md my-2 w-92 h-32 p-1 resize-none"
            {...register("newContent")}
          />

          <div className="flex items-center justify-center text-sm font-bold">
            <div
              className="cursor-pointer px-8 py-1 m-3 border-2 border-sygnature-brown text-sygnature-brown rounded-md "
              onClick={onClick}
              id={type}
            >
              취소하기
            </div>
            <button
              type="submit"
              className="w-32 h-8 font-bold mx-1 text-white bg-sygnature-brown border rounded-md align-middle text-base"
            >
              {type == "write" ? "작성하기" : "수정하기"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
