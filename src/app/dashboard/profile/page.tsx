"use client";

import { useSession, signOut } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const user = session?.user;

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-7">Profile</h1>
      <div className="bg-[#FFFFFF] px-8 py-10 w3/12 rounded-md mb-4">
        <p>
          Bienvenue <span className="font-bold">{user?.fullName}</span> !
        </p>
        <p className="mb-4">Ton email est {user?.email}</p>
      </div>
      <button className="bg-indigo-500 px-4 py-2 rounded-md text-white" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
}
