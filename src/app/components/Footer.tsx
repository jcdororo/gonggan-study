import Image from "next/image";
import { LuDot } from "react-icons/lu";


export default function Footer() {
  return (
    <>
      <div className="darkModeFooter p-12 text-center bg-sygnature-beige">

        <ul className="lg:flex justify-center m-4 gap-2">
          <li className="mb-4 lg:mb-0">
            <a href="" className="green">
              개인정보처리방침
            </a>
          </li>
          <LuDot size="20" className="hidden lg:block" />
          <li className="mb-4 lg:mb-0">
            <a href="">영상정보처리기기 운영관리 방침</a>
          </li>
          <li className="mb-4 lg:mb-0">
            <a href="">홈페이지 이용약관</a>
          </li>
          <LuDot size="20" className="hidden lg:block" />
          <li className="mb-4 lg:mb-0">
            <a href="">위치정보 이용약관</a>
          </li>
          <LuDot size="20" className="hidden lg:block" />
          <li className="mb-8 lg:mb-0">
            <a href="">윤리경영 핫라인</a>
          </li>
        </ul>

        <div className="lg:flex justify-center gap-8 mb-4 text-sm">
          <p className="mb-1 lg:mb-0">사업자등록번호 123-11-12345</p>
          <p className="mb-1 lg:mb-0">(주) 더 캐취뽀</p>
          <p className="mb-1 lg:mb-0">TEL : 02) 1234-1234 / FAX : 02) 1234-1234</p>
        </div>

        <p className="mb-4">
          &copy; <span className=""></span> The Catchppo Company. All
          Rights Reserved.
        </p>
        <div className="flex justify-center p-2 xs:w-[294px] xs:h-[72px] md:w-full md:h-[72px]">
          <Image src={"/logo.png"} alt="" width={80} height={50} />
        </div>
      </div>
    </>
  );
}
