import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {prisma} from "@/lib/prisma"
// import { PrismaClient } from "./app/generated/prisma/client";

export const runtime = "nodejs";

// const prisma = new PrismaClient();
export const {auth,handlers,signIn,signOut} = NextAuth({
    session:{
        strategy:"jwt",
    },
      providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
    adapter:PrismaAdapter(prisma),
    callbacks:{
        async jwt ({token,user}){
            if(user){
                token.id=user.id;
                token.name= user.name;
            }
            return token;
        },
        async  session({session,token}) {
            if(session.user){
                session.user.id=token.id as string;
                session.user.name=token.name as string;
            }
            return session;
        }
    }
}) 