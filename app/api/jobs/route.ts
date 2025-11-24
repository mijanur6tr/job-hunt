export const runtime = "nodejs";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    const session = await auth();

    if(!session?.user || !session?.user?.id){
        return NextResponse.redirect(new URL("/auth/signin",request.url))
    }

   try {
     const data = await request.json();
 
     const job = await prisma.job.create({
         data:{
             ...data,
             postedbyId:session.user.id,
         }
     })

     if(!job){
        return  NextResponse.json("Error in creating the job");
     }
     return NextResponse.json({data:job,message:"Job created successfully"});
  
   } catch (error) {
    console.log("Error in posting the job",error);
    return new NextResponse("Internal server error",{status:500});
   }
    
}


export async function GET(){
   
   try {
    const job = await prisma.job.findMany({
      orderBy:{
        postedAt:"desc",
      }
    })
     return NextResponse.json(job);
  
   } catch (error) {
    console.log("Error in getting the jobs",error);
    return new NextResponse("Internal server error",{status:500});
   }
    
}