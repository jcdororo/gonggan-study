"use client";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function SignInForm({ session }: any) {
  const router = useRouter();

  useEffect(() => {
    if (session != null) {
      signOut();
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      loginId: "",
      password: "",
      auto: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    try {
      const data = signIn("credentials", body);
      router.push("/");
    } catch (error) {
      throw new Error(error?.toString());      
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form__margin m-auto p-11"
      >
        <h1 className="text-3xl font-bold text-center">로그인</h1>
        <div className="form__block">
          <label className="lab" htmlFor="loginId">
            아이디
          </label>
          <input
            {...register("loginId", {
              required: "아이디를 입력해주세요.",
              validate: async (val: string) => {
                try {
                  const res = await axios.post("/api/duplicate/route", {
                    loginId: val,
                  });
                  if (res.data != "duplication") {
                    return "존재하지 않는 아이디입니다.";
                  }
                } catch (error) {
                  return;
                }
              },
            })}
            className="in"
            type="text"
          />
          {errors.loginId && (
            <p className="text-sm text-red-500 p-2">{errors.loginId.message}</p>
          )}
        </div>
        <div className="form__block">
          <label className="lab" htmlFor="password">
            비밀번호
          </label>
          <input
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              validate: async (val: string) => {
                if (val == "") return;
                try {
                  const res = await axios.post("/api/user/passwordCheck", {
                    id: watch("loginId"),
                    current_password: val,
                  });
                  if (res.data != "check") {
                    return "비밀번호가 맞지 않습니다.";
                  }
                } catch (error) {
                  throw new Error(error?.toString());      
                }
              },
            })}
            className="in"
            type="password"
          />
          {errors.password && (
            <p className="text-sm text-red-500 p-2">
              {errors?.password?.message}
            </p>
          )}
        </div>
        <div className="form_block flex">
          <input
            {...register("auto")}
            type="checkbox"
            className="w-5 h-5 mt-5 mr-2 accent-yellow-900"
          />
          <p className="mt-5">로그인 상태 유지</p>
        </div>
        <div className="form__block">
          <input type="submit" value="로그인" className="form__btn--submit" />
        </div>
      </form>
      <div className="inline-flex px-11 w-full justify-center text-sm">
        <Link href="/accountfind">
          <p className="mr-2">아이디 및 비밀번호 찾기</p>
        </Link>
        <p className="mr-2">|</p>
        <Link href="/signup">
          <p className="">회원가입</p>
        </Link>
      </div>
      <div className="flex justify-center mt-5 w-full m-auto p-10 ">
        {/* <input
          type="submit"
          value="K  카카오로 시작하기"
          className="bg-[#F7E600] border-inherit text-[#3A1D1D] cursor-pointer"
          onClick={() => signIn('kakao')}
        /> */}
        <Image
          className="cursor-pointer"
          src={"/kakao_login_large_wide.png"}
          width={450}
          height={0}
          alt="kakao"
          onClick={() => signIn("kakao")}
        />
      </div>
    </div>
  );
}
