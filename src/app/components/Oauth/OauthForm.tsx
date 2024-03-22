"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function OauthForm({session}:any) {
  const { update } = useSession();
  const router = useRouter();



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      nickname: "",
      email: "",
      alarm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {    
    try {
      const temp = {...body,role: 'user', method: 'oauth'}
      const { data } = await axios.post("/api/auth/oauth", {
          ...body,
          session,
        });
        update(temp)
        router.push("/");

    } catch (error) {
      throw new Error(error?.toString());      
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="m-auto p-11"
      >
        <h1 className="text-3xl font-bold text-center">회원가입</h1>

        <div className="form__block">
          <label className="lab" htmlFor="id">
            이메일<span className="text-red-900 font-bold">*</span>
          </label>
          <input
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: "이메일형식으로 기입해주세요.",
              },
              validate: async (val: string) => {
                if (val === (session as any).user.email) {
                  return;
                }
                try {
                  const res = await axios.post("/api/duplicate/route", {
                    email: val,
                  });
                  if (res.data == "duplication") {
                    return "중복된 이메일입니다.";
                  }
                } catch (error) {
                  throw new Error(error?.toString());      
                }
              },
            })}
            className="in"
          />
          {errors.email && (
            <p className="text-sm text-red-500 p-2">{errors?.email?.message}</p>
          )}
        </div>
        <div className="form__block">
          <label className="lab" htmlFor="nickname">
            닉네임<span className="text-red-900 font-bold">*</span>
          </label>
          <input
            {...register("nickname", {
              required: "닉네임을 입력해주세요.",
              minLength: {
                value: 5,
                message: "다섯 글자 이상 입력해주세요.",
              },
              validate: async (val: string) => {
                try {
                  const res = await axios.post("/api/duplicate/route", {
                    nickname: val,
                  });
                  if (res.data == "duplication") {
                    return "중복된 닉네임입니다.";
                  }
                } catch (error) {
                  throw new Error(error?.toString());      
                }
              },
            })}
            className="in"
          />
          {errors.nickname && (
            <p className="text-sm text-red-500 p-2">
              {errors?.nickname?.message}
            </p>
          )}
        </div>
        <div className="form_block"></div>
        <div className="form_block flex">
          <input
            {...register("alarm")}
            type="checkbox"
            name="alarm"
            id="alarm"
            className="w-5 h-5 mt-5 mr-2 accent-yellow-900"
          />
          <p className="mt-5">댓글 및 공(工)간의 정보 알림 받기</p>
        </div>
        <div className="form__block">
          <input type="submit" value="가입완료" className="form__btn--submit" />
        </div>
      </form>
    </div>
  );
}
