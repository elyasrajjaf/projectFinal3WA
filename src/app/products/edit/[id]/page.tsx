"use client";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

// Get Product by ID
const getProduct = async (id: string) => {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
};

// Update Product by ID
const updateProduct = async (id: string, product: any) => {
  const { data } = await axios.put(`/api/products/${id}`, product);
  return data;
};

export default function EditProduct({ params }: { params: { id: string } }) {
  const { id } = params;

  const router = useRouter();
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    getProduct(id)
      .then((data) => {
        setTitle(data.name);
        setDescription(data.description);
        setPrice(data.price);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSubmit = async () => {
    try {
      await updateProduct(id, { name: title, description, price });
      router.push("/products");
    } catch (err) {
      const { response } = err as AxiosError;
      if (response) {
        setError("Une erreur est survenue lors de la modification du produit");
      }
    }
  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex flex-col items-center">
      {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
      <form
        onSubmit={handleSubmit}
        className="bg-[#FFFFFF] w-1/5 py-12 px-10 rounded-2xl shadow-md justify-center flex flex-col items-center"
      >
        <h1 className="text-4xl font-bold mb-7">Modifier produit {title}</h1>
        <input
          type="text"
          placeholder="Nom du produit"
          name="name"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="bg-[#FAFAFA] px-6 py-4 block mb-6 w-full rounded-lg text-[#101010]"
          required
        />
        <input
          type="text"
          placeholder="Description du produit"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="bg-[#FAFAFA] px-6 py-4 block mb-6 w-full rounded-lg text-[#101010]"
          required
        />
        <input
          type="number"
          placeholder="Prix"
          name="price"
          onChange={(e) => setPrice(parseInt(e.target.value))}
          value={price}
          className="bg-[#FAFAFA] px-6 py-4 block mb-6 w-full rounded-lg text-[#101010]"
          required
        />
        <button type="submit" className="bg-indigo-500 px-4 py-2 w-full rounded-md text-white">
          Modifier
        </button>
      </form>
    </div>
  );
}
