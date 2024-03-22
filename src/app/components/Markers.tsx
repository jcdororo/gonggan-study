"use client";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { PlaceType } from "../interface";
import { currentPlaceState, locationState, mapState } from "../atom";
import { useCallback, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";


export default function Marker() {
  const map = useRecoilValue(mapState);
  const setCurrentPlace = useSetRecoilState(currentPlaceState);
  const [location, setLocation] = useRecoilState(locationState);

  const getPlaces = async () => {
    const res = await axios.get("/api/places/route");
    const data = res.data;
    return data as PlaceType[];
  };

  const { data: places } = useQuery<PlaceType[]>(`places`, getPlaces);

  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      // 식당 마커 띄우기
      places?.map((place) => {
        const imageSrc = "/images/markers/default.png", // 마커 이미지 주소
          imageSize = new window.kakao.maps.Size(40, 40), // 마커 이미지의 크기
          imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커 이미지의 옵션. 마커의 좌표와 일치시킬 이미지 안에서의 좌표 설정

        // 마커 이미지 생성
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        // 마커가 표시될 위치
        const markerPosition = new window.kakao.maps.LatLng(place?.y, place?.x);

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        marker.setMap(map);

        // 마커 커서가 오버 되었을 때 마커 위에 표시할 인포윈도우 생성
        const content = `<div class="infowindow">${place?.place_name}</div>`;

        // 커스텀 오버레이 생성
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          xAnchor: 0.6,
          yAnchor: 0.91,
        });

        // 마커에 마우스오버 이벤트 등록
        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          // 마커에 마우스오버 이벤트가 발생하면 커스텀 오버레이를 마커위에 표시
          customOverlay.setMap(map);
        });

        // 마커에 마우스아웃 이벤트 등록
        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          // 마커에 마우스오버 이벤트가 발생하면 커스텀 오버레이를 제거
          customOverlay.setMap(null);
        });

        // 선택한 가게 저장
        window.kakao.maps.event.addListener(marker, "click", function () {
          setCurrentPlace(place);
          setLocation({
            ...location,
            lat: place.y,
            lng: place.x,
          });
        });
      });
    }
  }, [map, places]);

  useEffect(() => {
    loadKakaoMarkers();
  }, [loadKakaoMarkers, map]);

  return <></>;
}
