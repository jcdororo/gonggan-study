"use client";
import { useRecoilState } from "recoil";
import { currentPlaceState } from "../atom";
import Image from "next/legacy/image";
import { AiOutlineClose, AiOutlinePhone } from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CurrentPlaceBox() {
  const [place, setPlace] = useRecoilState(currentPlaceState);
  const router = useRouter();
  return (
    <div className="">
      {place && (
        <>
          <div className="darkMode p-4 mt-[-230px] relative mx-auto rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-[80%] bg-white">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <Image
                  src="/images/markers/default.png"
                  width={40}
                  height={40}
                  alt="아이콘 이미지"
                />
                <div>
                  <div className="font-semibold">{place?.place_name}</div>
                  <div className="text-sm">{place?.category_group_name}</div>
                </div>
              </div>
              <div className="cursor-pointer hover:opacity-80" onClick={() => setPlace(null)}>
                <AiOutlineClose />
              </div>
            </div>
            <div className="pb-4">
              <div className="mt-2 flex gap-2 items-center col-span-3">
                <HiOutlineMapPin />
                {place?.road_address_name || "주소가 없습니다."}
              </div>
              <div className="mt-2 flex gap-2 items-center col-span-3">
                <AiOutlinePhone />
                {place?.phone || "번호가 없습니다."}
              </div>
            </div>
            <div
              onClick={() => router.push(`/places/${place._id}`)}
              className="w-full bg-sygnature-brown py-3 text-white font-semibold text-center rounded-md cursor-pointer hover:opacity-80"
            >
              상세보기
            </div>
          </div>
        </>
      )}
    </div>
  );
}
