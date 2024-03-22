"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { PlacePictureType, PlaceType } from "../interface";
import axios from "axios";
import { useQuery } from "react-query";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SwiperImageProps {
  place: PlaceType;
}

export default function SwiperImage({ place }: SwiperImageProps) {
  const [pictures, setPictures] = useState<PlacePictureType[]>();

  useEffect(() => {
    const getPlace = async () => {
      const { data } = await axios.get(
        `/api/place/getPicture?_id=${place._id}`
      );
      setPictures(data);
    };
    getPlace();
  }, []);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  SwiperCore.use([Autoplay]);

  const router = useRouter();

  return (
    <>
      <Swiper
        modules={[FreeMode, Navigation, Thumbs]}
        spaceBetween={10} // 슬라이스 사이 간격
        slidesPerView={1} // 보여질 슬라이드 수
        navigation={true} // prev, next button
        centeredSlides={true} // 1번 슬라이드가 가운데 보이기
        autoplay={{ delay: 2000 }}
      >
        {pictures?.map((picture) => (
          <SwiperSlide key={picture._id.toString()}>
            <div className="relative w-full h-[350px]">
              <Image
                src={picture.url}
                alt="장소 이미지"
                layout={"fill"}
                priority
                className="rounded-md cursor-pointer"
                onClick={() => router.push(`/places/${picture.place_id}`)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
