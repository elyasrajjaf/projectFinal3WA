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
      const res = await axios.post("/api/products", {
        name: formData.get("name"),
        description: formData.get("description"),
        price: formData.get("price"),
      });

      console.log(res);

      if (res.status === 201) return router.push("/products");
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
      <form onSubmit={handleSubmit} className="bg-neutral-950 px-8 py-10 w-3/12 rounded-md">
        <h1 className="text-4xl font-bold mb-7">Ajouter un produit</h1>
        <input
          type="text"
          placeholder="Nom du produit"
          name="name"
          className="bg-zinc-800 px-6 py-2 block mb-4 w-full rounded-sm"
          required
        />
        <input
          type="text"
          placeholder="Description du produit"
          name="description"
          className="bg-zinc-800 px-6 py-2 block mb-4 w-full rounded-sm"
          required
        />
        <input
          type="number"
          placeholder="Prix"
          name="price"
          className="bg-zinc-800 px-6 py-2 block mb-4 w-full rounded-sm"
          required
        />
        <button className="bg-indigo-500 px-4 py-2 w-full rounded-sm">AJOUTER</button>
      </form>
    </div>
  );
}
