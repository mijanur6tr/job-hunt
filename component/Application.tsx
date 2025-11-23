"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Application({jobId}:{jobId:string}){
    const {data:session,status} = useSession();
    const route = useRouter();

    const handlesubmit = async ()=>{ 

        if(!session){
            route.push("/auth/signin")
        }
        try {
            const response = await fetch(`/api/jobs/${jobId}/apply`,{
                "method":"POST",
            })
           const result = await response.json();

        if (!response.ok) {
            toast.error(result.message || "Something went wrong");
            return;
        }

        toast.success(result.message);
        route.push("/dashboard")

        } catch (error) {
            console.log("Error in submitting application",error)
        }
    }

  if (status === "loading") {
    return (
      <button
        disabled
        className="px-6 py-2 rounded-md bg-gray-300 text-gray-700 cursor-not-allowed"
      >
        Loading...
      </button>
    );
  }

  return (
    <button
      onClick={handlesubmit}
      className="px-5 mt-2 py-2 text-white font-semibold rounded-lg shadow transition duration-300 ease-in-out active:scale-95"
      style={{ backgroundColor: '#0078D4' }} // Approx color from your uploaded image
    >
      Apply Now
    </button>
  );

}