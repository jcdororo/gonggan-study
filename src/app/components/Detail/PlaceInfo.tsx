import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { useQuery } from "react-query";
import { PlaceType } from "../../interface";
import Image from "next/image";
import PlaceLike from "./PlaceLike";
import { PiNotebookBold } from "react-icons/pi";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import SwiperImage from "../SwiperImage";
import { FaExternalLinkAlt } from "react-icons/fa";



interface PlaceProps {
  _id: string;
}

export default function PlaceInfo({ _id }: PlaceProps) {
  const getPlace = async () => {
    const { data } = await axios.get(`/api/place/route?_id=${_id}`);
    return data as PlaceType;
  };

  const { data: place } = useQuery<PlaceType>(`place-${_id}`, getPlace, {
    enabled: !!_id,
    refetchOnWindowFocus: false,
  });

  const [pictureUrl, setPictureUrl] = useState();

  useEffect(() => {
    const getPlace = async () => {
      const { data } = await axios.get(`/api/place/getPicture?_id=${_id}`);
      setPictureUrl(data.url);
    };
    getPlace();
  }, []);



  return (
    <>
      <div className="relative block top-[-42px] w-full h-[350px] bg-gray-500 overflow-hidden">
        {/* {pictureUrl && (
          <Image
            src={pictureUrl}
            layout={"fill"}
            objectFit="cover"
            alt="장소 이미지"
          />
        )} */}
        {place && <SwiperImage place={place} />}
      </div>
      <div className="flex justify-between mb-10">
        <div
          className="flex px-8 text-2xl font-bold cursor-pointer gap-[10px]"
          onClick={() => window.open(`${place?.place_url}`, '_blank')}
        >
          {place?.place_name}
          <FaExternalLinkAlt size="16" className="mt-2" />
        </div>
        <div className="flex items-center pr-10">
          <PlaceLike _id={_id} />
        </div>
      </div>
      <div className="flex gap-2 px-8 pb-5">
        <FiMapPin size="24" />
        <div className="">{place?.road_address_name}</div>
      </div>
      <div className="flex gap-2 px-8 pb-5">
        <IoMdTime size="24" />
        <div>
          <div className="">
            {typeof place?.businessday == "string"
              ? place?.businessday
              : place?.businessday?.map(String).join(", ")
            } &nbsp;
            {place?.openhour} ~ {place?.closehour}
          </div>
        </div>
      </div>
      <div className="flex gap-2 px-8 pb-5">
        <IoExtensionPuzzleOutline size="24" />
        <div className="">{place?.howtouse}</div>
      </div>
      <div className="flex gap-2 px-8 pb-5">
        <div>
          <PiNotebookBold size="24" />
        </div>
        <div className="">{place?.desc}</div>
      </div>
    </>
  );
}
