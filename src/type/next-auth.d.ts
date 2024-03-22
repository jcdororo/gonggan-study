import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string;
      email: string;
      image: string;
      nickname: string;
      id?: string;
      emailVerified?: string;
      alarm?: boolean;
      role: string;
      method?: string;
      _id?: string;
    } & DefaultSession["user"];
  }
}