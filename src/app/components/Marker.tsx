import { useRecoilValue } from "recoil";
import { PlaceType } from "../interface";
import { mapState } from "../atom";
import { useCallback, useEffect } from "react";

interface MarkerProps {
  place: PlaceType;
}

export default function Marker({ place }: MarkerProps) {
  const map = useRecoilValue(mapState);

  const loadKakaoMarker = useCallback(() => {
    if (map && place) {
      // 현재 선택한 식당 데이터 마커 하나 띄우기
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
    }
  }, [map, place]);

  useEffect(() => {
    loadKakaoMarker();
  }, [loadKakaoMarker, map]);

  return <></>;
}
