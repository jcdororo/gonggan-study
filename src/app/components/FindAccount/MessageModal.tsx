import { UserInfoType } from "@/app/interface";

interface ModalProps {
  type: string;
  userInfo?: UserInfoType;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function MessageModal({ type, userInfo, onClick }: ModalProps) {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white py-4 px-5 mx-2 rounded-lg w-100">
          <div className="text-lg text-center">
            {userInfo?.method == "oauth" && (
              <div className="p-8">카카오톡 회원가입 이용자입니다.</div>
            )}
            {type == "findId" && userInfo?.method != "oauth" && (
              <div className="p-8">
                아이디는 &quot;{userInfo?.loginId}&quot; 입니다.
              </div>
            )}
            {type == "findPwd" && userInfo?.method != "oauth" && (
              <div className="p-8">
                입력하신 이메일 주소로 비밀번호 변경 메일을 발송했습니다.
              </div>
            )}
            <div className="flex justify-center pb-4">
              <div
                className="w-[150px] p-2 bg-sygnature-brown text-white rounded-2xl"
                onClick={onClick}
                id={type}
              >
                확인
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
