"use client"; 

import { login } from "@/lib/auth";


import { FcGoogle } from "react-icons/fc";

export default function SignIn() {



  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-50 px-4">
      <h1 className="text-3xl font-bold mb-2">Welcome to JobList</h1>
      <p className="text-gray-500 mb-6">
        Sign in to post jobs or apply for opportunities
      </p>

      <button
        className="flex items-center justify-center space-x-2 border border-gray-300 bg-white text-gray-700 px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"
        onClick={login}
      >
        <FcGoogle size={24} />
        <span>Continue with Google</span>
      </button>

      <p className="text-xs text-gray-400 mt-4 text-center">
        By signing in, you agree to our{" "}
        <a href="/termscons" className="text-blue-500 underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="text-blue-500 underline">
          Privacy Policy
        </a>
      </p>
    </div>
  );
}
