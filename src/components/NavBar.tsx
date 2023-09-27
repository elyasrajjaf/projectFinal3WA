"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-zinc-900 p-4">
      <div className="flex justify-between container mx-auto items-center">
        <Link href="/">
          <h1 className="font-bold text-xl">Inventory</h1>
        </Link>

        <ul className="flex gap-x-8">
          <li className="px-4 py-2">
            {session && status === "authenticated" ? (
              <Link href="/dashboard">Dashboard</Link>
            ) : (
              <Link href="/">Home</Link>
            )}
          </li>
          <li className="px-4 py-2">
            <Link href="/about">About Us</Link>
          </li>
          <li className="px-4 py-2">
            <Link href="/blog">Blog</Link>
          </li>
        </ul>
        <ul className="flex gap-x-3">
          {session && status === "authenticated" ? (
            <>
              <li className="px-4 py-2">
                <Link href="/dashboard/profile">Profile</Link>
              </li>
              <li className="px-4 py-2 bg-indigo-500 rounded-sm">
                <button onClick={() => signOut()}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="px-4 py-2  border border-indigo-500 rounded-sm">
                <Link href="/login">Login</Link>
              </li>
              <li className="px-4 py-2 bg-indigo-500 rounded-sm">
                <Link href="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
