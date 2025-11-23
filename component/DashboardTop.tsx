"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function DashboardTop() {
  const { data: session, status } = useSession();


  if (status === "loading") {
    return <p className="p-6">Loading...</p>;
  }

  if (!session) {
   <p>you are not logged in</p>
  }

  const user = session?.user;

  return (
    <div className="mx-30 flex justify-between items-center">
      <h1 className="text-3xl text-[#0078D4] font-bold mb-4">Dashboard</h1>
      <div className="flex items-center space-x-4">
        {/* User Image */}
        {user?.image && (
          <div className="w-16 h-16 relative rounded-full overflow-hidden border">
            <Image
              src={user.image}
              alt="user photo"
              fill
              sizes="64px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* User Info */}
        <div>
          <p className="text-lg font-semibold">{user?.name}</p>
          {user?.email && <p className="text-gray-600">{user?.email}</p>}
        </div>
      </div>
    </div>
  );
}
