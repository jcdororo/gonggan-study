import { connectDB } from "@/util/database";
import MyContents from "./MyContents";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Image from "next/image";
import { ObjectId } from "mongodb";
import { LikePlace, PlaceType, ReviewType } from "../interface";
import Link from "next/link";


export default async function MyPage() {
  const session: any = await getServerSession(authOptions);
  
  
  

  let likePlace = [];
  const placeReview = [] as ReviewType[];

  if (session) {
    const db = (await connectDB).db("gonggan");
    const result = (await db
      .collection("like_place")
      .find({ liked_user: session.user.id })
      .toArray()) as LikePlace[];
    likePlace = [];
    for (let i = 0; i < result.length; i++) {
      const response = (await db.collection("place").findOne({
        _id: new ObjectId(result[i].place_id.toString()),
      })) as PlaceType;

      if (response) {
        response._id = response._id?.toString();
        likePlace.push(response);
      }
    }
    const result2 = (await db
      .collection("review")
      .find({ writerid: new ObjectId(session.user.id) })
      .toArray()) as ReviewType[];
    for (let i = 0; i < result2.length; i++) {
      result2[i]._id = result2[i]._id.toString();
      result2[i].placeid = result2[i].placeid.toString();
      result2[i].writerid = result2[i].writerid.toString();
      placeReview.push(result2[i]);
    }
  }

  return (
    <div className="xs: scale-75 md:scale-100">
      <div className="text-center font-extrabold text-2xl my-4">마이페이지</div>
      <div className="flex justify-center mt-4 mb-14">
        <div className="flex justify-center items-center">
          {/* <div className='bg-black w-20 h-20 mx-3 mt-4 rounded-full'></div> */}
          <Image
            className="w-20 h-20 mx-3 mt-4 rounded-full bg-white"
            src={`${session.user.image ? session.user.image : "/logo.png"}`}
            width={110}
            height={75}
            alt="header"
          />
        </div>
        <div>
          <div className="my-4 mx-1 font-medium text-xl">
            <span className="">
              [
              {`${
                session.user.nickname ? session.user.nickname : "닉네임설정"
              }`}
              ]
            </span>{" "}
            <span className="text" style={{ color: "#998373" }}>
              님
            </span>
          </div>
          <div className="flex">
            <Link
              className="w-32 h-8 font-bold mx-1 text-xs text-white bg-sygnature-brown border rounded-md flex flex-col text-center justify-center hover:opacity-80 focus:opacity-80 border-transparent"
              href={"/contact"}
            >
              문의 하기
            </Link>
            <Link
              className="w-32 h-8 font-bold mx-1 text-xs text-white bg-sygnature-brown border rounded-md flex flex-col text-center justify-center hover:opacity-80 focus:opacity-80 border-transparent"
              href={"/mypage/profile"}
            >
              프로필 설정
            </Link>
          </div>
        </div>
      </div>

      <MyContents likePlace={likePlace} placeReview={placeReview} />
    </div>
  );
}
