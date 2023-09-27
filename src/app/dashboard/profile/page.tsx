"use client";
import { useSession, signOut } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  console.log(session, status);

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-7">Profile</h1>
      <pre className="bg-neutral-950 px-8 py-10 w3/12 rounded-md mb-4">
        {JSON.stringify(
          {
            session,
            status,
          },
          null,
          2
        )}
      </pre>
      <button className="bg-indigo-500 px-4 py-2 rounded-sm" onClick={() => signOut()}>Logout</button>
    </div>
  );
}
