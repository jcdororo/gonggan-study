import Image from "next/image";
import header from "/public/logo.png";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import HeaderInfo from "./HeaderInfo";
import Link from "next/link";
import { connectDB } from "@/util/database";
import { Document, ObjectId, WithId } from "mongodb";

interface Session {
  user: {
    name?: string;
    email?: string;
    image?: string;
    nickname: string;
    id: string;
  };
}

interface AlarmsContents {
  _id: string;
  check: boolean;
  content: string;
  date: string;
  link: string;
  receiver: string;
  role: string;
}

export default async function Header() {
  const session: any = await getServerSession(authOptions);


  let alarms: AlarmsContents[] = [];
  if (session) {
    const db = (await connectDB).db("gonggan");
    if (session.user.role == "user") {
      const rawAlarms: WithId<Document>[] = await db
        .collection("alarm")
        .find({ receiver: new ObjectId(session.user.id) })
        .toArray();
      alarms = rawAlarms.map((alarm) => ({
        _id: alarm._id.toString(),
        check: alarm.check,
        content: alarm.content,
        date: alarm.date,
        link: alarm.link,
        receiver: alarm.receiver.toString(),
        role: alarm.role,
      }));
    }
    // 유저의 role이 어드민 이라면 어드민의 알람까지 가져온다.
    if (session.user.role == "admin") {
      const rawAlarms: WithId<Document>[] = await db
        .collection("alarm")
        .find({
          $or: [{ role: "admin" }, { receiver: new ObjectId(session.user.id) }],
        })
        .toArray();
      alarms = rawAlarms.map((alarm) => ({
        _id: alarm._id.toString(),
        check: alarm.check,
        content: alarm.content,
        date: alarm.date,
        link: alarm.link,
        receiver: alarm.receiver.toString(),
        role: alarm.role,
      }));
    }
  }

  return (
    <div className="mb-8">
      <div
        className={`fixed w-full h-20 top-0 z-[9998] darkMode bg-white
      xs:h-[4rem]
      md:h-20
      `}
      ></div>
      <div
        className={`flex w-full h-20 fixed z-[9998] shadow-md
      xs:h-[4rem]
      md:h-20`}
      >
        <Link href={"/"}>
          <div className="ml-4 xs:w-[102px] xs:h-[71px] md:w-[138px] md:h-[77px]">
            <Image
              className={`"mx-1 ml-3 relative hover:opacity-80 scale-75 z-9999
            xs:scale-[50%] xs:-ml-6 xs:mx-4
            md:scale-[75%] md:ml-3`}
              src={header}
              width={110}
              height={75}
              alt="header"
              priority={true}
            />
          </div>
        </Link>

        <HeaderInfo session={session} alarms={alarms} />
      </div>
      <div className="h-20"></div>
    </div>
  );
}
