"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navigation() {
  const { data: session, status } = useSession();

  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/register") return null;

  return (
    <nav className="bg-[#ECECEC] p-4">
      <div className="flex justify-between container mx-auto items-center">
        <Link href="/">
          <Image
            src="/LogoInventorlyText.png"
            alt="Logo"
            width={170}
            height={40}
            className="cursor-pointer"
          />
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
            {session && status === "authenticated" ? (
              <Link href="/products">Products</Link>
            ) : (
              <Link href="/about">About Us</Link>
            )}
          </li>
          {session && status === "authenticated" && (
            <li className="px-4 py-2">
              <Link href="/category">Catégories</Link>
            </li>
          )}
          <li className="px-4 py-2">
            {session && status === "authenticated" ? (
              <Link href="/dashboard/profile">Profile</Link>
            ) : (
              <Link href="/blog">Blog</Link>
            )}
          </li>
        </ul>
        <ul className="flex gap-x-3 text-white">
          {!session && status === "unauthenticated" && (
            <li className="px-4 py-2  border border-indigo-500 rounded-md text-indigo-500">
              <Link href="/login">Login</Link>
            </li>
          )}
          <li className="px-4 py-2 bg-indigo-500 rounded-md">
            {session && status === "authenticated" ? (
              <button onClick={() => signOut()}>Logout</button>
            ) : (
              <Link href="/register">Register</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
