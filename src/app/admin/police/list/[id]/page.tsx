import Title from "@/app/components/Title";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const session: any = await getServerSession(authOptions);
  if(session.user.role != 'admin') {
    notFound();
  }
  const db = (await connectDB).db("gonggan");
  const result = await db.collection("police").findOne({ placeid: params.id });

  return (
    <div className="">
      <Title type="신고 내용" />
      <div className="darkMode mx-auto max-w-screen-sm p-12 mb-20 rounded-md bg-sygnature-beige flex flex-col gap-10">
        <div>
          <div className="font-bold text-xl mb-2">장소</div>
          <div className="pl-2">
            <Link
              href={`/places/${params.id}`}
              className="hover:underline text-blue-600"
            >
              {result?.placename}
            </Link>
          </div>
        </div>
        <div>
          <div className="font-bold text-xl mb-2">신고자</div>
          <div className="pl-2">{result?.reporter}</div>
        </div>
        <div>
          <div className="font-bold text-xl mb-2">대상자</div>
          <div className="pl-2">{result?.writerid}</div>
        </div>
        <div>
          <div className="font-bold text-xl mb-2">대상자 닉네임</div>
          <div className="pl-2">{result?.writernickname}</div>
        </div>
        <div>
          <div className="font-bold text-xl mb-2">분류</div>
          {result?.check.map((x: string[], i: number) => (
            <div key={i} className="pl-2"> - {x}</div>
          ))}
        </div>
        <div>
          <div className="font-bold text-xl mb-2">내용</div>
          <div className="pl-2">{result?.policeContent}</div>
        </div>
      </div>
    </div>
  );
};

export default page;
