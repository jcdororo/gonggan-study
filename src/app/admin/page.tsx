import React from "react";
import MainPage from "../components/Admin/MainPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { notFound } from "next/navigation";

export default async function Admin() {
  const session: any = await getServerSession(authOptions);
  if(session.user.role != 'admin') {
    notFound();
  }

  return (
    <>
      <MainPage></MainPage>
    </>
  )
}