"use client";

import { ContactType } from "@/app/interface";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface DetailProps {
  id: string;
}

export default function ContactDetail({ id }: DetailProps) {
  const router = useRouter();
  const [contact, setContact] = useState<ContactType>();

  const getContact = async () => {
    const { data } = await axios.get(`/api/contact/getContact?id=${id}`);
    setContact(data);
    reset({
      reply: data.reply
    });
  };

  useEffect(() => {
    getContact();
  }, []);

  const { register, handleSubmit, reset } = useForm({
    mode: "onBlur",
    defaultValues: {
      reply: contact?.reply
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    try {
      const { data } = await axios.put("/api/contact/updateContact", {
        _id: id,
        reply: body.reply,
      });
      router.push("/admin/contact/list");
    } catch (error) {
      throw new Error(error?.toString());      
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="w-1/2 m-auto">
          <div className="flex p-4 border-b-2">
            <div className="w-[100px] font-bold">제목</div>
            <div className="">{contact?.title}</div>
          </div>
          <div className="flex p-4 border-b-2">
            <div className="w-[100px] font-bold">이메일</div>
            <div className="">{contact?.email}</div>
          </div>
          <div className="flex p-4 border-b-2">
            <div className="w-[100px] font-bold">내용</div>
            <div className="">{contact?.content}</div>
          </div>
          <div className="flex p-4">
            <div className="w-[100px] font-bold">답변</div>
            <textarea
              {...register("reply", {
                required: "답변을 입력해주세요.",
              })}
              className="darkMode h-[250px] w-full text-sm p-4 rounded-md max-w-[680px] border border-solid border-gray-300"
            />
          </div>
          <div className="w-[100px] form__block">
            <input
              type="submit"
              value="답변하기"
              className="form__btn--submit"
            />
          </div>
        </div>
      </form>
    </>
  );
}
