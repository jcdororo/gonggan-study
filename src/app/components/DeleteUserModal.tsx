"use client";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ModalMessageProps {
  id: string;
  clickModal: () => void;
}

export default function DeleteUserModal({ id, clickModal }: ModalMessageProps) {
  const router = useRouter();

  // 회원 탈퇴
  const deleteUser = async () => {
    try {
      await axios
        .post("/api/user/deleteUser", {
          id,
        })
        .then(() => signOut())
        .then(() => router.push("/"));
    } catch (error) {
      throw new Error(error?.toString());      
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg w-96 h-40">
          <div className="text-center my-2 text-sm font-semibold">
            회원 탈퇴 하시겠습니까?
          </div>

          <div className="flex items-center justify-center mt-5 text-sm font-bold">
            <div
              className="cursor-pointer px-8 py-1 m-3 border-2 border-sygnature-brown text-sygnature-brown rounded-md hover:opacity-80"
              onClick={clickModal}
            >
              취소하기
            </div>
            <div
              className="cursor-pointer px-8 py-1 m-3 bg-sygnature-brown border border-sygnature-brown text-white rounded-md hover:opacity-80"
              onClick={deleteUser}
            >
              탈퇴하기
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
