import React from "react";
import Link from "next/link";

interface Props {
  category: string;
}

export default function Category({ category }: Props) {
  let title = "";

  if (category == "contact") title = "문의하기";
  if (category == "police") title = "신고하기";
  if (category == "propose") title = "장소 제안하기";

  return (
    <>
      <div className="">
        <div className="flex justify-center p-4 h-1/3">
          <div className="text-2xl font-bold">{title}</div>
        </div>
        <div className="p-4 h-1/3 flex justify-center">
          <div className="gap-4 flex">
            <div>완료 0건</div>
            <div>미완료 0건</div>
          </div>
        </div>
        <div className="flex h-1/3 justify-center items-end p-4 cursor-pointer">
          <div className="flex justify-center w-[150px] text-white p-2 bg-sygnature-brown rounded-2xl">
            <Link href={`/admin/${category}/list`}>목록 보기 &nbsp; &gt;</Link>
          </div>
        </div>
      </div>
    </>
  );
}
