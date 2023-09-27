"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) return setError(res.error as string);

    if (res?.ok) return router.push("/dashboard/profile");

    console.log(res);
  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex flex-row items-center">
      <form onSubmit={handleSubmit} className="bg-neutral-950 px-8 py-10 w3/12 rounded-md">
      {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
        <h1 className="text-4xl font-bold mb-7">Login</h1>
        <input
          type="email"
          placeholder="correo@correo.com"
          name="email"
          className="bg-zinc-800 px-6 py-2 block mb-4 w-full rounded-sm"
        />
        <input
          type="password"
          placeholder="*****"
          name="password"
          className="bg-zinc-800 px-6 py-2 block mb-4 w-full rounded-sm"
        />
        <button className="bg-indigo-500 px-4 py-2 w-full rounded-sm">Login</button>
      </form>
    </div>
  );
}
