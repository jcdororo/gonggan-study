import Title from "@/app/components/Title";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PoliceList() {
  const session: any = await getServerSession(authOptions);
  if(session.user.role != 'admin') {
    notFound();
  }
  const db = (await connectDB).db("gonggan");
  const result = await db.collection("police").find().toArray();

  return (
    <div>
      <Title type="신고 목록" />
      <div className="max-w-6xl mx-auto">
        <div className="darkMode p-4">
          <table className="w-full">
            <thead>
              <tr className="h-14 border-y-2 border-sygnature-brown">
                <th className="py-2 w-16 ">상태</th>
                <th className="py-2 w-96 ">장소</th>
                <th className="py-2 w-48 ">대상자</th>
                <th className="py-2 w-44 ">신고자</th>
                <th className="py-2 w-28 ">날짜</th>
              </tr>
            </thead>

            <tbody className="">
              {result.reverse().map((x, i) => (
                <tr key={x._id.toString()} className="h-10">
                  <td>
                    <div className="flex justify-center items-center">
                      <div className="flex justify-center items-center bg-sygnature-brown rounded-2xl h-8 w-16 text-sm text-white">
                        {x.status}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 pl-10">
                    <Link
                      href={`/admin/police/list/${x.placeid}`}
                      className="hover:underline cursor-pointer"
                    >
                      {x.placename}
                    </Link>
                  </td>
                  <td className="py-2 text-center">{x.writerid}</td>
                  <td className="py-2 text-center">{x.reporter}</td>
                  <td className="py-2 text-center">{x.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
