"use client";

import axios, { AxiosError } from "axios";
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
interface Category {
  _id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function ProductAdd() {
  const [error, setError] = useState();
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  // Fetch categories = user's categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/category");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const res = await axios.post("/api/products", {
        name: formData.get("name"),
        description: formData.get("description"),
        price: formData.get("price"),
        stock: formData.get("stock"),
        category: formData.get("category"),
      });


      if (res.status === 201) return router.push("/products");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.error);
      }
    }
  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex flex-col items-center">
      {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
      <form
        onSubmit={handleSubmit}
        className="bg-[#FFFFFF] w-2/5 py-12 px-10 rounded-2xl shadow-md"
      >
        <h1 className="text-4xl font-bold mb-7">Ajouter un produit</h1>
        <input
          type="text"
          placeholder="Nom du produit"
          name="name"
          className="bg-[#FAFAFA] px-6 py-4 block mb-6 w-full rounded-lg text-[#101010]"
          required
        />
        <input
          type="text"
          placeholder="Description du produit"
          name="description"
          className="bg-[#FAFAFA] px-6 py-4 block mb-6 w-full rounded-lg text-[#101010]"
          required
        />
        <input
          type="number"
          placeholder="Prix"
          name="price"
          className="bg-[#FAFAFA] px-6 py-4 block mb-6 w-full rounded-lg text-[#101010]"
          required
        />
        <input
          type="number"
          placeholder="Stock"
          name="stock"
          className="bg-[#FAFAFA] px-6 py-4 block mb-6 w-full rounded-lg text-[#101010]"
          required
        />
        <select
          name="category"
          className="bg-[#FAFAFA] px-6 py-4 block mb-6 w-full rounded-lg text-[#101010]"
          required
        >
          <option value="">Choisir une catégorie</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}

          {categories.length > 0 && <option value="autre">Autre</option>}

          {categories.length === 0 && <option value="0">Aucune catégorie trouvée</option>}
        </select>
        <button className="bg-indigo-500 px-4 py-2 w-full rounded-sm text-white">AJOUTER</button>
      </form>
    </div>
  );
}
