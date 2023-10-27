"use client";

import Link from "next/link";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (!formData.get("fullName") || !formData.get("email") || !formData.get("password"))
      return setError("Veuillez remplir tous les champs");

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
      if (error instanceof AxiosError) {
        setError("Une erreur est survenue, veuillez réessayer plus tard");
      }
    }
  };

  return (
    <div className="justify-center h-[calc(100vh)] flex flex-row items-center bg-[#FAFAFA]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#FFFFFF] w-1/5 py-12 px-10 rounded-2xl shadow-md justify-center flex flex-col items-center"
      >
        <Link href="/">
          <Image
            src="/LogoInventorlyText.png"
            alt="Logo"
            width={170}
            height={40}
            className="cursor-pointer"
          />
        </Link>
        <h1 className="text-md font-normal text-center my-4 text-[#101010]">
          Bienvenue à nouveau ! 👋
        </h1>
        {error && (
          <div className="bg-red-500 text-white px-2 mb-6 rounded-md w-full text-center py-3">
            {error}
          </div>
        )}
        <input
          type="text"
          placeholder="Nom complet"
          name="fullName"
          className="bg-[#FAFAFA] px-6 py-4 block mb-6 w-full rounded-lg text-[#101010]"
        />
        <input
          type="email"
          placeholder="adresse@mail.com"
          name="email"
          className="bg-[#FAFAFA] px-6 py-4 block mb-6 w-full rounded-lg text-[#101010]"
        />
        <input
          type="password"
          placeholder="*****"
          name="password"
          className="bg-[#FAFAFA] px-6 py-4 block mb-12 w-full rounded-lg text-[#101010]"
        />
        <p className="text-gray-700 mb-4">
          Vous avez un compte ?{" "}
          <Link href="/login" className="text-[#514BF3]">
            Se connecter
          </Link>
        </p>
        <button className="bg-[#514BF3] px-4 py-3 w-1/2 rounded-md text-white">
          S&apos;inscrire
        </button>
      </form>
    </div>
  );
}
