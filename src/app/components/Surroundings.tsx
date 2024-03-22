import { useEffect, useState } from "react";
import { PlaceType } from "../interface";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { locationState } from "../atom";

interface SurroundingsProps {
  places?: PlaceType[];
}

// 위치 정보 표현 타입
interface Location {
  latitude: number;
  longitude: number;
}

export default function Surroundings({ places }: SurroundingsProps) {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 위치 정보 가져오기
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // 위치 정보 가져오기 성공
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            // 위치 정보 가져오기 실패
            setError(`Error getting location: ${error.message}`);
          }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
      }
    };
    
    getLocation();
  }, []); 

  const locationDefault = useRecoilValue(locationState);
  
  const currentX: any = location == null ? locationDefault.lng : location?.longitude; // 경도 Longitude
  const currentY: any = location == null ? locationDefault.lat : location?.latitude; // 위도 Latitude

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // 지구의 반지름 (단위: km)
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const nearbyLocations = places?.filter((place) => {
    const distance = calculateDistance(
      currentY,
      currentX,
      Number(place.y),
      Number(place.x)
    );
    return distance <= 1;
  });

  const spaces = nearbyLocations?.map((place) => {
    const distance = calculateDistance(
      currentY,
      currentX,
      Number(place.y),
      Number(place.x)
    );
    const mDistance = Number(distance.toFixed(2)) * 1000 + "m";
    return { ...place, mDistance };
  });

  const sortedSpaces = spaces?.slice().sort((a, b) => {
    // 'm'를 제외하고 숫자만 비교
    const distanceA = parseFloat(a.mDistance);
    const distanceB = parseFloat(b.mDistance);

    // 숫자를 비교하여 오름차순으로 정렬
    return distanceA - distanceB;
  });

  const [limit, setLimit] = useState(10);

  const handleReadMore = () => {
    setLimit((prevLimit) => prevLimit + 10);
  };

  let spacesList;
  if (spaces?.length === 0) {
    spacesList = <div className="p-4 py-8 text-center">주변에 공간이 없습니다.</div>
  } else {
    spacesList = sortedSpaces?.slice(0, limit).map((space, index) => (
      <div key={index}>
        <Link href={`/places/${space._id}`}>
          <div className="m-4 p-2 flex justify-between">
            <div className="flex gap-[5px] ">
              <div className="text-lg ">{space.location}</div>
              <div className="text-xs mt-[9px] text-sygnature-brown">
                {space.category_group_name}
              </div>
            </div>
            <div className="text-xs mt-[9px] text-sygnature-brown">
              {space.mDistance}
            </div>
          </div>
        </Link>
      </div>
    ));
  }

  

  return (
    <>
      {spacesList}
      <div className="flex justify-center pt-1 cursor-pointer">
        {spaces && limit < spaces.length && (
          <div className="flex justify-center pb-5 w-[150px] p-2">
            <div onClick={handleReadMore}>더 보기 &nbsp; </div>
            <div className="flex items-center">
              <IoIosArrowDown />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
