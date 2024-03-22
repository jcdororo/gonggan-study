"use client";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import { PiNotePencilBold } from "react-icons/pi";

export default function ReviewMain() {
  // 스크롤
  const [scrollVisible, setScrollVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollVisible(window.scrollY > 1900);
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="darkModeMain flex items-center justify-center h-screen p-4 sm:p-10 bg-sygnature-beige">
        <div className="flex-col xs:max-w-[22rem] md:max-w-none">
          <div
            className={`mb-12 text-center`}
          >
            <div className="flex justify-center animate-bounce mb-4">
              <PiNotePencilBold size="30" />
            </div>
            <div className="font-bold text-xl sm:text-3xl">
              <p>
                사용자가 제공하는 <br className="block sm:hidden" />
                공간의 정보와
              </p>
              <p>사용후기들을 확인해보세요 !</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className={`relative w-[150px] h-[200px] sm:w-[300px] sm:h-[400px] ${scrollVisible ? "img-trans1" : ""} left-10`}>
              <Image
                src={"/images/mainpage/review2.png"}
                layout={"fill"}
                priority
                alt="리뷰 이미지"
                className={`${scrollVisible ? "img-trans1" : ""} left-10`}
              />
            </div>
            <div className={`relative w-[150px] h-[200px] sm:w-[300px] sm:h-[400px] ${scrollVisible ? "img-trans2" : ""} `}>
              <Image
                src="/images/mainpage/review1.png"
                layout={"fill"}
                priority
                alt="리뷰 이미지"
                className={`${scrollVisible ? "img-trans1" : ""} left-10`}
              />
            </div>
            <div className={`relative w-[150px] h-[200px] sm:w-[300px] sm:h-[400px] ${scrollVisible ? "img-trans3" : ""} right-10`}>
              <Image
                src="/images/mainpage/review3.png"
                layout={"fill"}
                priority
                alt="리뷰 이미지"
                className={`${scrollVisible ? "img-trans1" : ""} left-10`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
