export const runtime = "nodejs";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request:Request,{params}:{params:Promise<{jobId:string}>}){
    const session = await auth();

    if(!session?.user || !session?.user?.id){
        return NextResponse.redirect(new URL("/auth/signin",request.url))
    }

   try {

    const {jobId} = await params;
    const job = await prisma.job.findUnique({where:{id:jobId}});

    if(!job){
        return  NextResponse.json("Job with is not found",{status:404})
    }

    const isExistingAppication = await prisma.application.findFirst({
        where:{
            jobId:jobId,
            userId:session.user.id
        }
    })

    if(isExistingAppication){
        return  NextResponse.json({message:"You have already applied for the post"},{status:400})
    }

    const application = await prisma.application.create({
        data:{
            jobId:jobId,
            userId:session.user.id,
            status:"PENDING",
        }
    })
   
    return NextResponse.json({data:application,message:"Application submitted successfully"})
  
   } catch (error) {
    console.log("Error in posting the job",error);
    return new NextResponse("Internal server error",{status:500});
   }
    
}