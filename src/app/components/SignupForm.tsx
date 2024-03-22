"use client";
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useRef } from "react";
import { signOut } from "next-auth/react";
import React from "react";

export default function SignUpForm({ session }: any) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      loginId: "",
      nickname: "",
      email: "",
      password: "",
      password_confirm: "",
    },
  });

  useEffect(() => {
    if (session != null) {
      signOut();
    }
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    try {
      const { data } = await axios.post("/api/signup/route", body);
      router.push("/signin");
    } catch (error) {
      throw new Error(error?.toString());      
    }
  };

  return (
    <>
      <div className="mx-auto max-w-2xl p-5">
        <form onSubmit={handleSubmit(onSubmit)} className="m-auto p-11">
          <h1 className="text-3xl font-bold text-center">회원가입</h1>
          <div className="form__block">
            <label className="lab" htmlFor="loginId">
              아이디
            </label>
            <input
              {...register("loginId", {
                required: "아이디를 입력해주세요.",
                minLength: {
                  value: 5,
                  message: "다섯 글자 이상 입력해주세요.",
                },
                validate: async (val: string) => {
                  try {
                    const res = await axios.post("/api/duplicate/route", {
                      id: val,
                    });
                    if (res.data == "duplication") {
                      return "중복된 아이디입니다.";
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
              <p className="text-sm text-red-500 p-2">
                {errors?.loginId?.message}
              </p>
            )}
          </div>
          <div className="form__block">
            <label className="lab" htmlFor="nickname">
              닉네임
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
          <div className="form__block">
            <label className="lab" htmlFor="email">
              이메일
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
              <p className="text-sm text-red-500 p-2">
                {errors?.email?.message}
              </p>
            )}
          </div>
          <div className="form__block">
            <label className="lab" htmlFor="password">
              비밀번호
            </label>
            <input
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                pattern: {
                  value: /(?=.*\d{1,50})(?=.*[~`!@#$%^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,}$/,
                  message: "영문, 숫자, 특수기호를 조합해서 8글자 이상으로 만들어 주세요. ",
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
          <div className="form__block">
            <label className="lab" htmlFor="password_confirm">
              비밀번호 확인
            </label>
            <input
              {...register("password_confirm", {
                required: "비밀번호 확인을 입력해주세요.",
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "입력하신 비밀번호와 일치하지 않습니다.";
                  }
                },
              })}
              className="in"
              type="password"
            />
            {errors.password_confirm && (
              <p className="text-sm text-red-500 p-2">
                {errors?.password_confirm?.message}
              </p>
            )}
          </div>
          
          <div className="form__block">
            <input
              type="submit"
              value="가입완료"
              className="form__btn--submit"
            />
          </div>
        </form>
      </div>
    </>
  );
}
