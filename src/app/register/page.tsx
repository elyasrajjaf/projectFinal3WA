"use client";

import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const signupResponse = await axios.post("/api/auth/signup", {
        email: formData.get("email"),
        password: formData.get("password"),
        fullName: formData.get("fullName"),
      });

      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.ok) return router.push("/dashboard/profile");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.error);
      }
    }
  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex flex-col items-center">
      {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-neutral-950 px-8 py-10 w3/12 rounded-md">
        <h1 className="text-4xl font-bold mb-7">Register</h1>
        <input
          type="text"
          placeholder="Full Name"
          name="fullName"
          className="bg-zinc-800 px-6 py-2 block mb-4 w-full rounded-sm"
        />
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
        <button className="bg-indigo-500 px-4 py-2 w-full rounded-sm">Register</button>
      </form>
    </div>
  );
}
