"use client";

import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductAdd() {
  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const res = await axios.post("/api/category", {
        name: formData.get("name"),
      });

      if (res.status === 201) return router.push("/category");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.error);
      }
    }
  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex flex-col items-center">
      {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-[#FFFFFF] w-1/5 py-12 px-10 rounded-2xl shadow-md">
        <h1 className="text-4xl font-bold mb-7">Ajouter une nouvelle catégorie</h1>
        <input
          type="text"
          placeholder="Nom du catégorie"
          name="name"
          className="bg-[#FAFAFA] px-6 py-4 block mb-6 w-full rounded-lg text-[#101010]"
          required
        />
        <button className="bg-indigo-500 px-4 py-2 w-full rounded-md text-white">Ajouter</button>
      </form>
    </div>
  );
}
