"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { mapState } from "../atom";
import Link from "next/link";
import { useDebounce } from "../hooks/useDebounce";
import { useInputImgs } from "../hooks/useInputImgs";
import Image from "next/image";
import { FaCamera, FaFlag, FaWindowClose } from "react-icons/fa";
import Map from "./Map";
import { inputHoverFocus } from "../styles/styles";
import { ObjectId } from "mongodb";
import kakaoSearchMap from "@/util/kakaoSearchMap";
import { sendAlarm } from "@/util/sendAlarm";

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

interface Picture {
  _id: ObjectId;
  place_id: string;
  url: string;
}

const ProposeList = ({ session, params }: any) => {
  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [howtouseValue, setHowtouseValue] = useState("");
  const [descValue, setdescValue] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [placeInfo, setPlaceInfo] = useState<Result | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [place, setPlace] = useState([]);
  const [map, setMap] = useRecoilState(mapState);
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [openHour, setOpenHour] = useState("");
  const [closeHour, setCloseHour] = useState("");
  const [businessDay, setBusinessDay] = useState<string[]>([]);
  const [confirm, setConfirm] = useState("approved");
  

  const [sun, setSun] = useState(false);
  const [mon, setMon] = useState(false);
  const [tue, setTue] = useState(false);
  const [wed, setWed] = useState(false);
  const [thu, setThu] = useState(false);
  const [fri, setFri] = useState(false);
  const [sat, setSat] = useState(false);

  if (!session) {
    setTimeout(() => {
      router.push("/signin");
    }, 500);
    return (
      <div className="h-96 flex flex-col justify-center items-center font-bold text-2xl text-sygnature-brown">
        <div>
          로그인 후 진행 해 주세요 <br />
          <br />
        </div>

        <div>
          잠시 후{" "}
          <Link className="text-blue-500 hover:underline" href={"/signin"}>
            {" "}
            로그인
          </Link>{" "}
          페이지로 이동합니다.
        </div>
      </div>
    );
  }
  useEffect(() => {
    const handleKeyESC = (e: { key: string; }) => {
      if(e.key === 'Escape') {
        setFocus(false);
      }
    }

    const handleKeyEnter = (e: { key: string; }) => {
      if(e.key === 'Enter') {
        setFocus(true);
      }
    }
    window.addEventListener('keydown', handleKeyESC)
    window.addEventListener('keydown', handleKeyEnter)

  
    return () => {
      window.removeEventListener('keydown',handleKeyESC)
      window.removeEventListener('keydown',handleKeyEnter)

    }
  }, [])

  useLayoutEffect(() => {
    // 사진 가져오기
    const pitures = async () => {
      const response = await fetch(`/api/propose/getPictures?id=${params.id}`, {
        method: "GET",
      }).then((r) => r.json());
      setImagePreview(response.map((x: Picture, i: number) => x.url));
    };
    pitures();
    // 정보 가져오기
    const infos = async () => {
      const propose = await fetch(
        `/api/propose/proposeSearch/?id=${params.id}`,
        { method: "GET" }
      )
        .then((r) => r.json())
        .then((r) => {
          setQuery(r.location),
            setOpenHour(r.openhour),
            setCloseHour(r.closehour);
          setBusinessDay(r.businessday),
            setPhoneValue(r.phone),
            setHowtouseValue(r.howtouse),
            setdescValue(r.desc),
            setPlaceInfo(r),
            r.businessday && r.businessday.indexOf("월") !== -1
              ? setMon(true)
              : setMon(false),
            r.businessday && r.businessday.indexOf("화") !== -1
              ? setTue(true)
              : setTue(false),
            r.businessday && r.businessday.indexOf("수") !== -1
              ? setWed(true)
              : setWed(false),
            r.businessday && r.businessday.indexOf("목") !== -1
              ? setThu(true)
              : setThu(false),
            r.businessday && r.businessday.indexOf("금") !== -1
              ? setFri(true)
              : setFri(false),
            r.businessday && r.businessday.indexOf("토") !== -1
              ? setSat(true)
              : setSat(false),
            r.businessday && r.businessday.indexOf("일") !== -1
              ? setSun(true)
              : setSun(false);
        });
    };
    infos();
  }, [])


  useLayoutEffect(() => {
    const openHourEl = document.getElementById("openhour") as HTMLSelectElement;

    for (let i = 0; i < openHourEl.options.length; i++) {
      if (openHourEl.options[i].value === openHour) {
        openHourEl.options[i].selected = true;
        break;
      }
    }

    const closeHourEl = document.getElementById(
      "closehour"
    ) as HTMLSelectElement;

    for (let i = 0; i < closeHourEl.options.length; i++) {
      if (closeHourEl.options[i].value === closeHour) {
        closeHourEl.options[i].selected = true;
        break;
      }
    }
  }, [openHour, closeHour]);

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
        if (!placeInfo) {
          setPlaceInfo(null);
        }
        const datas = [];
        const apiUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${searchQuery}`;

        const place = await fetch(
          `/api/place/placeSearch?query=${searchQuery}`,
          { method: "GET" }
        ).then((r) => r.json());
        // .then(r => datas.push(...r))

        datas.push(...place);
        setPlace(place);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(e.target.value);
  };

  const handleHowtouseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHowtouseValue(e.target.value);
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setdescValue(e.target.value);
  };

  const handleFocus = () => {
    setFocus(true);
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

  const handleClick = async () => {
    const temp = {
      check: false,
      content: `[admin] 장소 제안 [${query}] ${confirm} 되었습니다.`,
      date: new Date(),
      link: "/admin/propose/list",
      receiver: "",
      role: "admin",
    };
    await sendAlarm(temp);
  };

  const checkForm = () => {
    let info = "";
    query ? "" : (info += "[위치] ");
    results.length ? "" : (info += "[위치 선택] ");
    howtouseValue ? "" : (info += "[이용방법] ");
    descValue ? "" : (info += "[설명]");

    info ? (info += " 을 작성 해 주세요") : (info = "");

    return info;
  };

  // 사진첨부기능
  const handleClose = (e: React.MouseEvent<HTMLElement>, i: number) => {
    setImagePreview([
      ...imagePreview.slice(0, i),
      ...imagePreview.slice(i + 1, imagePreview.length),
    ]);
    setImage([...image.slice(0, i), ...image.slice(i + 1, image.length)]);
  };

  const handleAttach = () => {
    imageRef.current?.click();
  };

  const handleAttachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    useInputImgs(e, image, setImage, imagePreview, setImagePreview);
  };

  // Openhour
  const handleOpenHour = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOpenHour(e.target.value);
  };
  // Closehour
  const handleCloseHour = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCloseHour(e.target.value);
  };

  // 영업일
  const handleBusinessDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const day = e.currentTarget.value
    if(day == '월') {
      setMon(!mon);
    } else if(day == '화') {
      setTue(!tue);
    } else if(day == '수') {
      setWed(!wed);
    } else if(day == '목') {
      setThu(!thu);
    } else if(day == '금') {
      setFri(!fri);
    } else if(day == '토') {
      setSat(!sat);
    } else {
      setSun(!sun);
    } 
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setConfirm(e.target.value);
  };

  return (
    <div>
      <div className="text-center font-extrabold text-2xl my-4">
        장소 제안 하기
      </div>
      <form
        action="/api/propose/proposeConfirm"
        method="POST"
        className="mx-auto max-w-screen-sm p-5 mt-5"
      >
        {/* 사진첨부 */}
        <div className="darkMode w-full p-5 bg-sygnature-beige min-h-[180px] my-2
        xs:grid-cols-2 
        md:grid-cols-3">
          <div className="grid grid-cols-3 gap-4">
            {imagePreview.map((x, i) => (
              <div key={i} className="relative">
                <div className="h-[150px]">
                  <Image
                    className="w-full h-full"
                    src={x}
                    width={110}
                    height={75}
                    alt="header"
                  />
                  <FaWindowClose
                    className="absolute top-0 right-0 cursor-pointer text-sygnature-brown"
                    onClick={(e: React.MouseEvent<HTMLElement>) =>
                      handleClose(e, i)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="darkMode my-4 h-14 flex flex-row justify-center items-center border-2 border-black border-dashed hover:bg-gray-100 cursor-pointer"
          onClick={handleAttach}
        >
          <input
            type="file"
            ref={imageRef}
            accept="image/*"
            multiple={false}
            onChange={handleAttachChange}
            className="hidden"
          />
          <FaCamera className="mx-1" /> 사진 첨부하기
        </div>

        {/* 위치 */}
        <div className="font-semibold">
          위치<span className="text-red-500 font-bold">*</span>
        </div>
        <input
          className="darkMode px-2 my-2 border-gray-300 w-full hover:outline-none hover:ring hover:ring-sygnature-brown focus:outline-none focus:ring focus:ring-sygnature-brown"
          name="location"
          onFocus={handleFocus}
          value={query}
          onChange={handleChange}
          ref={inputRef} // ref를 추가하여 input 엘리먼트에 대한 참조를 설정
          autoComplete="off"
          spellCheck='false'
        />
        <div
          className={`z-10 border absolute -translate-y-3 bg-white ${
            focus ? "visible" : "hidden"
          }`}
        >
          <ul>
            {results.map((result: Result, i) => (
              <li
                className={`cursor-pointer p-1 m-1 hover:bg-gray-100 ${
                  result._id ? "text-sygnature-brown" : ""
                }`}
                key={i}
                onClick={() => handleResultClick(result)}
              >
                {result._id ? <FaFlag className="inline" /> : ""}
                <span className="font-bold"> {result.place_name}</span>
                <span> [{result.address_name}],</span>
                <span> [{result.road_address_name}]</span>
              </li>
            ))}
          </ul>
        </div>
        {/* 지도 */}
        <div className="sm:-translate-x-7">
          <Map />
        </div>
        <div className="font-semibold mt-2">
          영업시간<span className="text-red-500 font-bold">*</span>
        </div>
        <div className="flex flex-row mt-2 mb-4 ">
          <select
            className="darkMode w-24 text-center border border-gray-300 rounded-md cursor-pointer"
            name="openhour"
            onChange={handleOpenHour}
            id="openhour"
          >
            <option value="00:00">00 : 00</option>
            <option value="00:30">00 : 30</option>
            <option value="01:00">01 : 00</option>
            <option value="01:30">01 : 30</option>
            <option value="02:00">02 : 00</option>
            <option value="02:30">02 : 30</option>
            <option value="03:00">03 : 00</option>
            <option value="03:30">03 : 30</option>
            <option value="04:00">04 : 00</option>
            <option value="04:30">04 : 30</option>
            <option value="05:00">05 : 00</option>
            <option value="05:30">05 : 30</option>
            <option value="06:00">06 : 00</option>
            <option value="06:30">06 : 30</option>
            <option value="07:00">07 : 00</option>
            <option value="07:30">07 : 30</option>
            <option value="08:00">08 : 00</option>
            <option value="08:30">08 : 30</option>
            <option value="09:00">09 : 00</option>
            <option value="09:30">09 : 30</option>
            <option value="10:00">10 : 00</option>
            <option value="10:30">10 : 30</option>
            <option value="11:00">11 : 00</option>
            <option value="11:30">11 : 30</option>
            <option value="12:00">12 : 00</option>
            <option value="12:30">12 : 30</option>
            <option value="13:00">13 : 00</option>
            <option value="13:30">13 : 30</option>
            <option value="14:00">14 : 00</option>
            <option value="14:30">14 : 30</option>
            <option value="15:00">15 : 00</option>
            <option value="15:30">15 : 30</option>
            <option value="16:00">16 : 00</option>
            <option value="16:30">16 : 30</option>
            <option value="17:00">17 : 00</option>
            <option value="17:30">17 : 30</option>
            <option value="18:00">18 : 00</option>
            <option value="18:30">18 : 30</option>
            <option value="19:00">19 : 00</option>
            <option value="19:30">19 : 30</option>
            <option value="20:00">20 : 00</option>
            <option value="20:30">20 : 30</option>
            <option value="21:00">21 : 00</option>
            <option value="21:30">21 : 30</option>
            <option value="22:00">22 : 00</option>
            <option value="22:30">22 : 30</option>
            <option value="23:00">23 : 00</option>
            <option value="23:30">23 : 30</option>
            <option value="24:00">24 : 00</option>
          </select>
          <span className="flex items-center mx-4 font-bold text-lg"> ~ </span>
          <select
            className="darkMode w-24 text-center border border-gray-300 rounded-md cursor-pointer"
            name="closehour"
            onChange={handleCloseHour}
            id="closehour"
          >
            <option value="00:00">00 : 00</option>
            <option value="00:30">00 : 30</option>
            <option value="01:00">01 : 00</option>
            <option value="01:30">01 : 30</option>
            <option value="02:00">02 : 00</option>
            <option value="02:30">02 : 30</option>
            <option value="03:00">03 : 00</option>
            <option value="03:30">03 : 30</option>
            <option value="04:00">04 : 00</option>
            <option value="04:30">04 : 30</option>
            <option value="05:00">05 : 00</option>
            <option value="05:30">05 : 30</option>
            <option value="06:00">06 : 00</option>
            <option value="06:30">06 : 30</option>
            <option value="07:00">07 : 00</option>
            <option value="07:30">07 : 30</option>
            <option value="08:00">08 : 00</option>
            <option value="08:30">08 : 30</option>
            <option value="09:00">09 : 00</option>
            <option value="09:30">09 : 30</option>
            <option value="10:00">10 : 00</option>
            <option value="10:30">10 : 30</option>
            <option value="11:00">11 : 00</option>
            <option value="11:30">11 : 30</option>
            <option value="12:00">12 : 00</option>
            <option value="12:30">12 : 30</option>
            <option value="13:00">13 : 00</option>
            <option value="13:30">13 : 30</option>
            <option value="14:00">14 : 00</option>
            <option value="14:30">14 : 30</option>
            <option value="15:00">15 : 00</option>
            <option value="15:30">15 : 30</option>
            <option value="16:00">16 : 00</option>
            <option value="16:30">16 : 30</option>
            <option value="17:00">17 : 00</option>
            <option value="17:30">17 : 30</option>
            <option value="18:00">18 : 00</option>
            <option value="18:30">18 : 30</option>
            <option value="19:00">19 : 00</option>
            <option value="19:30">19 : 30</option>
            <option value="20:00">20 : 00</option>
            <option value="20:30">20 : 30</option>
            <option value="21:00">21 : 00</option>
            <option value="21:30">21 : 30</option>
            <option value="22:00">22 : 00</option>
            <option value="22:30">22 : 30</option>
            <option value="23:00">23 : 00</option>
            <option value="23:30">23 : 30</option>
            <option value="24:00">24 : 00</option>
          </select>
        </div>

        {/* 영업 시간 */}
        <div className="font-semibold">영업일</div>
        <div className="flex flex-row items-center justify-center my-2">
          <input
            onChange={handleBusinessDay}
            readOnly={true}
            checked={mon}
            name="businessday"
            type="checkbox"
            value={"월"}
            className={`w-7 h-7 accent-sygnature-brown ml-4 cursor-pointer${inputHoverFocus}`}
          />
          <span className="ml-2 mr-8 block xs:mr-3 md:mr-8">월</span>
          <input
            onChange={handleBusinessDay}
            readOnly={true}
            checked={tue}
            name="businessday"
            type="checkbox"
            value={"화"}
            className={`w-7 h-7 accent-sygnature-brown cursor-pointer${inputHoverFocus}`}
          />
          <span className="ml-2 mr-8 block xs:mr-3 md:mr-8">화</span>
          <input
            onChange={handleBusinessDay}
            readOnly={true}
            checked={wed}
            name="businessday"
            type="checkbox"
            value={"수"}
            className={`w-7 h-7 accent-sygnature-brown cursor-pointer${inputHoverFocus}`}
          />
          <span className="ml-2 mr-8 block xs:mr-3 md:mr-8">수</span>
          <input
            onChange={handleBusinessDay}
            readOnly={true}
            checked={thu}
            name="businessday"
            type="checkbox"
            value={"목"}
            className={`w-7 h-7 accent-sygnature-brown cursor-pointer${inputHoverFocus}`}
          />
          <span className="ml-2 mr-8 block xs:mr-3 md:mr-8">목</span>
          <input
            onChange={handleBusinessDay}
            readOnly={true}
            checked={fri}
            name="businessday"
            type="checkbox"
            value={"금"}
            className={`w-7 h-7 accent-sygnature-brown cursor-pointer${inputHoverFocus}`}
          />
          <span className="ml-2 mr-8 block xs:mr-3 md:mr-8">금</span>
          <input
            onChange={handleBusinessDay}
            readOnly={true}
            checked={sat}
            name="businessday"
            type="checkbox"
            value={"토"}
            className={`w-7 h-7 accent-sygnature-brown cursor-pointer${inputHoverFocus}`}
          />
          <span className="ml-2 mr-8 block xs:mr-3 md:mr-8">토</span>
          <input
            onChange={handleBusinessDay}
            readOnly={true}
            checked={sun}
            name="businessday"
            type="checkbox"
            value={"일"}
            className={`w-7 h-7 accent-sygnature-brown cursor-pointer${inputHoverFocus}`}
          />
          <span className="ml-2 mr-4 block xs:mr-3 md:mr-8">일</span>
        </div>

        {/* 전화번호 */}
        <div className="font-semibold mt-4 mb-2 w-full">
          전화번호
          <span className="ml-1 text-sm text-red-500">( - 없이, 생략가능)</span>
        </div>
        <input
          maxLength={20}
          name="phone"
          className={`darkMode px-2 border-gray-300 w-full ${inputHoverFocus}`}
          onChange={handlePhoneChange}
          value={phoneValue}
          autoComplete="off"
        />

        {/* 이용방법 */}
        <div className="font-semibold my-2">
          이용방법<span className="text-red-500 font-bold">*</span>
        </div>
        <textarea
          maxLength={500}
          name="howtouse"
          className={`darkMode p-2 h-40 border rounded-md border-gray-300 w-full resize-none ${inputHoverFocus}`}
          onChange={handleHowtouseChange}
          value={howtouseValue}
          autoComplete="off"
        />

        {/* 설명 */}
        <div className="font-semibold my-2">
          설명<span className="text-red-500 font-bold">*</span>
        </div>
        <textarea
          maxLength={500}
          name="desc"
          className={`darkMode p-2 h-40 border rounded-md border-gray-300 w-full resize-none ${inputHoverFocus}`}
          onChange={handleDescChange}
          value={descValue}
          autoComplete="off"
        />

        <div className="my-5 flex flex-row justify-center">
          {checkForm() ? (
            checkForm()
          ) : (
            <div className="flex gap-3">
              <select
                className="darkMode border-transparent w-24 text-center border border-gray-300 rounded-md cursor-pointer"
                name="confirm"
                onChange={handleSelect}
              >
                <option value="approved">승인</option>
                <option value="rejected">반려</option>
              </select>
              <button
                className="w-64 h-16 font-bold mx-1 text-xl text-white bg-sygnature-brown border rounded-md flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 border-transparent"
                type="submit"
                onClick={handleClick}
              >
                완료
              </button>
            </div>
          )}
          {
            <input
              className="hidden"
              name="_id"
              value={params.id}
              onChange={() => {}}
            />
          }
        </div>

        <div className="hidden">
          {placeInfo?.address_name && (
            <input
              name="address_name"
              value={placeInfo?.address_name}
              onChange={() => {}}
            />
          )}
          {placeInfo?.category_group_code && (
            <input
              name="category_group_code"
              value={placeInfo?.category_group_code}
              onChange={() => {}}
            />
          )}
          {placeInfo?.category_group_name && (
            <input
              name="category_group_name"
              value={placeInfo?.category_group_name}
              onChange={() => {}}
            />
          )}
          {placeInfo?.category_name && (
            <input
              name="category_name"
              value={placeInfo?.category_name}
              onChange={() => {}}
            />
          )}
          {placeInfo?.distance && (
            <input
              name="distance"
              value={placeInfo?.distance}
              onChange={() => {}}
            />
          )}
          {placeInfo?.id && (
            <input name="id" value={placeInfo?.id} onChange={() => {}} />
          )}
          {placeInfo?.phone && (
            <input name="phone" value={placeInfo?.phone} onChange={() => {}} />
          )}
          {placeInfo?.place_name && (
            <input
              name="place_name"
              value={placeInfo?.place_name}
              onChange={() => {}}
            />
          )}
          {placeInfo?.place_url && (
            <input
              name="place_url"
              value={placeInfo?.place_url}
              onChange={() => {}}
            />
          )}
          {placeInfo?.road_address_name && (
            <input
              name="road_address_name"
              value={placeInfo?.road_address_name}
              onChange={() => {}}
            />
          )}
          {placeInfo?.x && (
            <input name="x" value={placeInfo?.x} onChange={() => {}} />
          )}
          {placeInfo?.y && (
            <input name="y" value={placeInfo?.y} onChange={() => {}} />
          )}
          {placeInfo?.y && (
            <input
              name="date"
              value={new Date().toLocaleDateString("ko-KR").toString()}
              onChange={() => {}}
            />
          )}
          {placeInfo?.y && (
            <input name="status" value={"진행중"} onChange={() => {}} />
          )}
        </div>
      </form>
    </div>
  );
};

export default ProposeList;
