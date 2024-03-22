/* eslint-disable prefer-const */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaFlag, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { useDebounce } from "../hooks/useDebounce";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { mapState } from "../atom";
import kakaoSearchMap from "@/util/kakaoSearchMap";
import { IoCloseSharp } from "react-icons/io5";

interface Result {
  _id?: string;
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [place, setPlace] = useState([]);
  const [placeInfo, setPlaceInfo] = useState<Result | null>(null);
  const [map, setMap] = useRecoilState(mapState);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    const handleKeyESC = (e: { key: string }) => {
      if (e.key === "Escape") {
        setFocus(false);
      }
    };

    const handleKeyEnter = (e: { key: string }) => {
      if (e.key === "Enter") {
        setFocus(true);
      }
    };
    window.addEventListener("keydown", handleKeyESC);
    window.addEventListener("keydown", handleKeyEnter);

    return () => {
      window.removeEventListener("keydown", handleKeyESC);
      window.removeEventListener("keydown", handleKeyEnter);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // 클릭된 엘리먼트가 input 엘리먼트 혹은 그 자손인 경우에는
      // setFocus(false)를 호출하지 않음
      if (inputRef.current && inputRef.current.contains(target)) {
        return;
      }

      // 다른 곳을 클릭한 경우 setFocus(false) 호출

      setFocus(false);
    };

    // document에 클릭 이벤트 리스너 추가
    document.addEventListener("click", handleClickOutside);

    // 컴포넌트가 언마운트되면 이벤트 리스너 제거
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []); // useEffect는 한 번만 실행되도록 빈 배열을 전달

  const handleSearch = async (searchQuery: string) => {
    try {
      // 검색어가 빈칸일땐 호출하지 않음
      if (query.length > 0) {
        setPlaceInfo(null);
        let datas = [];

        const place = await fetch(
          `/api/place/placeSearch?query=${searchQuery}`,
          { method: "GET" }
        ).then((r) => r.json());
        // .then(r => datas.push(...r))
        datas.push(...place);
        setPlace(place);

        const apiUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${searchQuery}`;

        const response = await kakaoSearchMap(apiUrl);

        if (!response.ok) {
          throw new Error("네트워크 응답이 정상이 아닙니다");
        }

        const data = await response.json();
        datas.push(...data.documents);

        setResults(datas);
        if (!placeInfo) {
          setFocus(true);
        }
      }
    } catch (error) {
      throw new Error(error?.toString());      
    }
  };

  // 검색 api 호출에 0.5초 딜레이를 줌
  const debouncedQuery = useDebounce(query, 300);
  useEffect(() => {
    handleSearch(debouncedQuery);
  }, [debouncedQuery]);

  const handleFocus = (e: React.MouseEvent<HTMLInputElement>) => {
    setIsFocus(true);
  };

  const handleclick = (e: React.MouseEvent<HTMLElement>) => {
    setQuery("");
    setFocus(false);
    setResults([]);
    setIsFocus(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleResultClick = (result: Result) => {
    // 클릭한 결과 정보를 출력
    setQuery(result.place_name);
    setPlaceInfo(result);
    setFocus(false);

    // 이동할 위도 경도 위치를 생성합니다
    const moveLatLon = new window.kakao.maps.LatLng(result.y, result.x);
    // 지도 중심을 이동 시킵니다
    map.setCenter(moveLatLon);
    const iwContent = `<div style="padding:10px;">${result.place_name}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwPosition = new window.kakao.maps.LatLng(result.y, result.x), //인포윈도우 표시 위치입니다
      iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    // 인포윈도우를 생성하고 지도에 표시합니다
    const infowindow = new window.kakao.maps.InfoWindow({
      map: map, // 인포윈도우가 표시될 지도
      position: iwPosition,
      content: iwContent,
      removable: iwRemoveable,
    });
  };
  return (
    <>
      <div
        className={`relative darkModeSearchBar -mt-8 pt-8 z-1 xs:fixed xs:top-0 xs:z-9999 xs:-translate-x-3 xs:-translate-y-[1px] md:scale-x-[100%] md:scale-y-[100%] md:relative md:z-[9997] md:translate-x-0 md:translate-y-0 md:-mt-8
        ${isFocus ? "xs:scale-x-[100%] xs:-mt-[48px] xs:scale-y-[100%] xs:w-full xs:translate-x-0 md:w-auto" : "xs:scale-x-[35%] xs:scale-y-[40%]"}`}
        >
        <div className={`p-3 -mb-10 h-[110px] md:h-[80px] z-0 flex flex-col items-center ${isFocus ? "xs:p-0 md:p-3" : ""}`}>
          <div
            className={`relative md:ml-12 xs:ml-0 w-112 md:w-128 h-24 xs:h-full flex flex-row justify-center items-center overflow-hidden rounded-full hover:shadow-lg bg-sygnature-beige
            ${isFocus? "z-10 ml-0 h-[80px] my-4 md:my-0 xs:w-full md:w-128 xs:rounded-none md:rounded-3xl": ""}`}
            >
            <span className="flex items-center text-2xl z-10 font-bold text-sygnature-brown cursor-pointer pl-8 pr-2"><FaSearch size="34" /></span>
            <input
              className={`bg-sygnature-beige px-4 my-2 border-gray-300 border-opacity-0 w-128 focus:outline-none text-lg md:text-base
              ${isFocus ? "xs:w-full xs:text-lg md:w-128" : "xs:text-3xl"}`}
              name="location"
              value={query}
              onChange={handleChange}
              ref={inputRef} // ref를 추가하여 input 엘리먼트에 대한 참조를 설정
              onClick={handleFocus}
              autoComplete="off"
              placeholder="스터디 장소를 검색해보세요 !"
              spellCheck="false"
            />
            <div
              className={`w-10 text-2xl text-sygnature-brown cursor-pointer hover:font-bold mr-4 ${isFocus ? "" : "hidden"} `}
              onClick={handleclick}
            >
              <IoCloseSharp size="30" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute w-full md:w-128 top-0 left-0 md:top-1/2 md:left-1/2 xs:transform md:-translate-x-[46%] translate-y-[8%] md:translate-y-[35%] z-10">
        <div className={`bg-sygnature-beige md:rounded-2xl pb-3 border-sygnature-brown hover:shadow-lg ${focus ? "visible" : "hidden"} -translate-y-14 z-0
          ${isFocus? "overflow-y-scroll h-[300px]": ""}`}
          onClick={() => setIsFocus(false)}
          >
          <ul className="darkModeSearchBar">
            {results.map((result: Result, i) => (
              <li
                className={`cursor-pointer p-4 mx-4 my-2 hover:bg-gray-100 ${
                  result._id ? "text-sygnature-brown" : ""
                }`}
                key={i}
                onClick={() => handleResultClick(result)}
              >
                <span className="font-bold block xs:text-xl md:text-base">
                  {" "}
                  {result._id ? <FaMapMarkerAlt className="inline" /> : ""}{" "}
                  {result.place_name}{" "}
                </span>
                <span className="xs:text-base md:text-base xs:block md:inline">
                  {" "}
                  [{result.address_name}],{" "}
                </span>
                <span className="xs:text-base md:text-base">
                  {" "}
                  [{result.road_address_name}]
                </span>
              </li>
            ))}
            {place.length ? (
              ""
            ) : (
              <li className="">
                <div className="my-14 max-w-[38rem] h-24 flex flex-col justify-center items-center overflow-hidden">
                  <div className="pt-12 pb-1 text-2xl font-bold xs:text-2xl md:text-2xl">
                    &quot;{query}&quot; 검색 결과 없음
                  </div>
                  <div className="p-1 cursor-pointer text-blue-600 mb-12 hover:font-bold hover:underline xs:text-xl md:text-base">
                    <Link href={"/propose"}>+ 장소 제안하기</Link>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
