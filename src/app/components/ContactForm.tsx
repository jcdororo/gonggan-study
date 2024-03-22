"use client";

import React from "react";
import { useSession } from 'next-auth/react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ContactForm() {

  const router = useRouter();

  const { data: userData, status } = useSession();

  const {
    register,
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: userData?.user?.email,
      title: "",
      content: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    try {
      const { data } = await axios.post("/api/contact/route", {
        email: userData?.user?.email,
        title: body.title,
        content: body.content, 
      });
      router.push("/mypage");
    } catch (error) {
      throw new Error(error?.toString());      
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-5">

      <form onSubmit={handleSubmit(onSubmit)} className="m-auto p-11">
        <h1 className="text-3xl font-bold text-center">문의하기</h1>
        <div className="form__block">
          <label className="lab" htmlFor="email">
            이메일
          </label>
          <input
              {...register("email", {
                disabled: true,
                value: userData?.user?.email
              })}
              className="in bg-gray-200"
            />
        </div>
        <div className="form__block">
          <label className="lab" htmlFor="title">
            제목
          </label>
          <input
              {...register("title", {
                required: "제목을 입력해주세요.",
              })}
              className="in"
              type="text"
            />
        </div>
        <div className="form__block">
          <label className="lab" htmlFor="content">
            내용
          </label>
          <textarea
              {...register("content", {
                required: "내용을 입력해주세요.",
              })}
              className="darkMode h-[250px] w-full text-sm p-4 rounded-md max-w-[680px] border border-solid border-gray-300"
            />
        </div>
        <div className="form__block">
          <input type="submit" value="문의하기" className="form__btn--submit" />
        </div>
      </form>

    </div>
  );
}
