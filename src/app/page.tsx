import { Roboto } from "next/font/google";
import SearchBar from "./components/SearchBar";
import Map from "./components/Map";
import Space from "./components/Space";
import Marker from "./components/Markers";
import { PlaceType } from "./interface";
import axios from "axios";
import CurrentPlaceBox from "./components/CurrentPlaceBox";
import MainInfo1 from "./components/MainInfo1";
import MainInfo3 from "./components/MainInfo3";
import HotPlace from "./components/MainPage/HotPlace";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import Link from "next/link";
import Footer from "./components/Footer";
import ReviewMain from "./components/MainPage/ReviewMain";
import { connectDB } from "@/util/database";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function Home() {

  return (
    <div className={`${roboto.className}`}>
      <div className="md:space-y-20">
        <div
          className={`relative justify-center items-center
      xs:flex xs:flex-col
      md:block `}
        >
          {/* Search Bar */}
          <SearchBar />
        </div>

        {/*  맵과 주변공간 */}
        <div className="relative bg-white pt-1 darkMode">
          <div className="md:mx-12">
            <div className="w-full flex flex-col md:gap-16 md:flex-row">
              <div className="w-[90%] mb-8 md:w-3/5 z-0">
                <Map />
                <Marker />
                <CurrentPlaceBox />
              </div>
              <div className="w-[90%] mx-auto md:w-2/5">
                <Space category="주변" />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="flex justify-center cursor-pointer animate-bounce">
            <Link href="#hot">
              <MdOutlineKeyboardDoubleArrowDown size="30" color="gray" />
            </Link>
          </div>
        </div>
      </div>

      {/* 핫한공간 */}
      <div id="hot">
        <HotPlace />
      </div>
      {/* <HotPlace /> */}
      {/* 내 집 근처에서 편하게 공부할 수 있는 공간. */}
      <MainInfo1 />
      <ReviewMain />

      {/* 스터디 장소를 공유할 수 있어요. */}
      <MainInfo3 />
      <Footer />
    </div>
  );
}

