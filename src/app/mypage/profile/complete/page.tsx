'use client'
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation'

export default function ThanksToPropose() {

  setTimeout(() => {
    signOut();
  }, 3000);
  return (
    <div className="h-96 flex flex-col justify-center items-center font-bold text-2xl text-sygnature-brown">
      <div>
        수정이 완료되었습니다.. <br />
        다시 로그인 해 주세요.<br /><br />
      </div>

      {/* <div>잠시 후 로그인 페이지로 이동합니다.</div> */}
    </div>
  )
}