'use client'
import { useRouter } from 'next/navigation'

export default function ThanksToPropose() {
  const router = useRouter()

  setTimeout(() => {
    router.push('/')
  }, 2500);
  return (
    <div className="h-96 flex flex-col justify-center items-center font-bold text-2xl text-sygnature-brown">
      <div>
        작성해 주셔서 감사합니다. <br />
        검토 후 반영하겠습니다.<br /><br />
      </div>

      <div>잠시 후 메인페이지로 이동합니다.</div>
    </div>
  )
}