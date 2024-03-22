"use client";

/*global kakao */
import Script from "next/script";
import { useRecoilState, useRecoilValue } from "recoil";
import { locationState, mapState } from "../atom";
import { memo, useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

interface Location {
  latitude: number;
  longitude: number;
}

export default memo(function Map({ lat, lng, zoom }: MapProps) {
  const [map, setMap] = useRecoilState(mapState);
  const location = useRecoilValue(locationState);
  const [locationCurrent, setLocationCurrent] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // 위치 정보 가져오기
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // 위치 정보 가져오기 성공
            setLocationCurrent({
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

  useEffect(() => {
    if (locationCurrent) {
      // 위치 정보가 있을 때 맵을 불러옴
      loadKakaoMap();
    }
  }, [locationCurrent]);

  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(
          lat ?? locationCurrent == null ? location.lat : locationCurrent?.latitude,
          lng ?? locationCurrent == null ? location.lng :locationCurrent?.longitude
        ),
        level: zoom ?? location.zoom,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

      setMap(map);
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div
        id="map"
        className="h-[40vh] sm:h-[50vh] rounded-lg shadow-3xl translate-x-5 sm:translate-x-9 md:translate-x-5"
      ></div>
    </>
  );
});
