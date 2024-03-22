"use client";

import React, { useState } from "react";
import ModalDelete from "./ModalDelete";
import ModalUpdate from "./ModalUpdate";
import { FaHeart, FaStar, FaThumbsUp } from "react-icons/fa";
import ModalLikeDelete from "./ModalLikeDelete";
import { PlaceType, ReviewType } from "../interface";
import Link from "next/link";

interface MyContentsProps {
  likePlace: PlaceType[];
  placeReview: ReviewType[];
}

const MyContents = ({ likePlace, placeReview }: MyContentsProps) => {
  const [btnName, setBtnName] = useState("like");
  const [modalDeleteOpen, setModalDeletelOpen] = useState(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [modalLikeOpen, setModalLikeOpen] = useState(false);

  const [targetContent, setTargetContent] = useState<
    PlaceType | ReviewType | undefined
  >(undefined);

  const handleClick: React.MouseEventHandler<HTMLDivElement> | undefined = (
    event
  ): void => {
    event.currentTarget.textContent == "좋아요"
      ? setBtnName("like")
      : setBtnName("review");
  };

  // 리뷰 -> 삭제
  const handleDelete = (
    e: React.MouseEvent<HTMLDivElement>,
    content: ReviewType
  ) => {
    setTargetContent(content);
    setModalDeletelOpen(!modalDeleteOpen);
  };

  // 리뷰 -> 수정
  const handleUpdate = (
    e: React.MouseEvent<HTMLDivElement>,
    content: ReviewType
  ) => {
    setTargetContent(content);
    setModalUpdateOpen(!modalUpdateOpen);
  };

  // 좋아요 -> ♥
  const handleLike = (
    e: React.MouseEvent<HTMLDivElement>,
    content: PlaceType
  ) => {
    setTargetContent(content);
    setModalLikeOpen(!modalLikeOpen);
  };

  return (
    <div>
      {/* 좋아요, 리뷰 버튼 */}
      <div className="flex flex-row justify-center text-2xl pt-10 pb-3 text-center">
        <div
          className={`p-4 cursor-pointer mx-4 w-52 border-b-2 ${
            btnName == "like" ? " border-black font-bold" : ""
          }`}
          onClick={handleClick}
        >
          좋아요
        </div>
        <div
          className={`p-4 cursor-pointer mx-4 w-52 border-b-2 ${
            btnName == "review" ? " border-black font-bold" : ""
          }`}
          onClick={handleClick}
        >
          리뷰
        </div>
      </div>

      {/* 좋아요, 리뷰 버튼에 따른 컴포넌트 보여줌 */}
      {btnName == "like" ? (
        <div className="flex flex-col place-items-center justify-center">
          {likePlace.length ? (
            likePlace.map((x, i) => (
              <div
                key={i}
                className="flex flex-row relative border border-black rounded-md my-3"
              >
                <div className="font-extrabold my-3 ml-3 mr-1 w-52 hover:underline">
                  <Link href={`/places/${x._id}`}>{x.place_name}</Link>
                </div>
                <div className="flex justify-end items-center font-bold w-56">
                  <div className="mx-5 text-3xl" style={{ color: "#998373" }}>
                    <FaHeart
                      className="cursor-pointer hover:scale-125 transition-transform duration-150"
                      onClick={(
                        e: React.MouseEvent<HTMLDivElement, MouseEvent>
                      ) => handleLike(e, x)}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="relative my-8 font-bold">
              등록 된 좋아요가 없습니다
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col place-items-center justify-center">
          {placeReview.length ? (
            placeReview.map((x, i) => (
              <div
                key={i}
                className="flex flex-col relative border border-black rounded-md my-3 h-40"
              >
                <div className="flex flex-row h-9">
                  <div className="font-extrabold my-3 mx-3 w-80 hover:underline">
                    <Link href={`/places/${x.placeid.toString()}`}>
                      {x.placename}
                    </Link>
                  </div>
                  <div className="flex flex-row pt-4 text-xs font-semibold">
                    <div
                      className="ml-6 mr-1 cursor-pointer xs:w-[2.5rem] md:w-[1.5rem]"
                      onClick={(e) => handleUpdate(e, x)}
                    >
                      수정
                    </div>
                    <div
                      className="ml-1 mr-6 cursor-pointer xs:w-[2.5rem] md:w-[1.5rem]"
                      onClick={(e) => handleDelete(e, x)}
                    >
                      삭제
                    </div>
                  </div>
                </div>

                <div className="mx-3 my-1 text-xs font-bold flex flex-row align-middle">
                  <FaStar /> {x.star}점
                </div>

                <div className="mx-2 my-2 px-1 flex flex-row items-center text-sygnature-brown">
                  <FaThumbsUp />
                  <div className="px-2 font-bold">{placeReview.length}</div>
                </div>

                <div className="flex flex-col overflow-hidden">
                  <div className="w-96 mx-3 text-xs font-medium">
                    {x.content}
                  </div>
                </div>
              </div>
            )).reverse()
          ) : (
            <div className="relative my-8 font-bold">
              등록 된 리뷰가 없습니다
            </div>
          )}
        </div>
      )}

      {/* 모달 */}
      {modalUpdateOpen ? (
        <ModalUpdate
          handleUpdate={handleUpdate}
          targetContent={targetContent}
        />
      ) : (
        ""
      )}
      {modalDeleteOpen ? (
        <ModalDelete
          handleDelete={handleDelete}
          targetContent={targetContent}
        />
      ) : (
        ""
      )}
      {modalLikeOpen ? (
        <ModalLikeDelete
          handleDelete={handleLike}
          targetContent={targetContent}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default MyContents;
