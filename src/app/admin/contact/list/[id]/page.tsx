import ContactDetail from "@/app/components/Admin/ContactDetail";
import Title from "@/app/components/Title";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function Detail ({ params }: { params: { id: string } }) {
  const id = params?.id;
  const session: any = await getServerSession(authOptions);
  if(session.user.role != 'admin') {
    notFound();
  }

  return (
    <>
      <Title type="문의 내용" />
      <ContactDetail id={id} />
    </>
  )
}