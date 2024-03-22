import { connectDB } from "@/util/database";
import Link from "next/link";

interface TableProps {
  type: string;
}

export default async function Table({ type }: TableProps) {
  const db = (await connectDB).db("gonggan");
  const contacts = await db.collection("contact").find().toArray();

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="darkMode p-4">
          <table className="w-full">
            <thead>
              <tr className="h-14 border-y-2 border-sygnature-brown">
                <th className="py-2 w-20">상태</th>
                <th className="py-2 w-96">제목</th>
                <th className="py-2 w-48">이메일</th>
                <th className="py-2 w-48">날짜</th>
              </tr>
            </thead>

            <tbody className="">
              {contacts.reverse().map((contact, index) => (
                <tr key={contact._id.toString()} className="h-10">
                  <td>
                    <div className="flex justify-center items-center">
                      <div className="flex justify-center items-center bg-sygnature-brown rounded-2xl h-8 w-16 text-sm text-white">
                        {contact.status || "미완료"}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 pl-10">
                    <Link
                      href={`/admin/contact/list/${contact._id.toString()}`}
                      className="hover:underline cursor-pointer"
                    >
                      {contact.title}
                    </Link>
                  </td>
                  <td className="text-center">{contact.email}</td>
                  <td className="text-center">{contact.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
