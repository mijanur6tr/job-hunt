"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png"

export default function Navbar() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-8">

        {/* LEFT — Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Logo" width={32} height={32} />
          <span className="text-xl text-[#0078D4] font-semibold">Job Hunt</span>
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button 
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* RIGHT MENU — Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">

          <Link href="/jobs" className="hover:text-[#0078D4]">Browse Jobs</Link>

          {session && (
            <>
              <Link href="/jobs/post" className="hover:text-[#0078D4]">Post a Job</Link>
              <Link href="/dashboard" className="hover:text-[#0078D4]">Dashboard</Link>
            </>
          )}

          {!session && !loading && (
            <Link
              href="/auth/signin"
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}

          {session && (
            <button
              onClick={() => signOut()}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden  justify-center items-center border-t bg-white px-4 py-4 flex flex-col gap-4 text-sm font-medium">

          <Link href="/jobs" className="hover:text-[#0078D4]" onClick={() => setOpen(false)}>
            Browse Jobs
          </Link>

          {session && (
            <>
              <Link href="/jobs/post" className="hover:text-[#0078D4]" onClick={() => setOpen(false)}>
                Post a Job
              </Link>

              <Link href="/dashboard" className="hover:text-[#0078D4]" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
            </>
          )}

          {!session && !loading && (
            <Link
              href="/auth/signin"
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>
          )}

          {session && (
            <button
              onClick={() => { signOut(); setOpen(false); }}
              className="px-4 py-2 border rounded-md hover:bg-gray-100 text-left"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
