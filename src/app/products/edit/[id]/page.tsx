"use client";

import { useEffect, useState, FormEvent } from "react";
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

interface Category {
  _id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function EditProduct({ params }: { params: { id: string } }) {
  const { id } = params;

  const router = useRouter();
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

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

  useEffect(() => {
    getProduct(id)
      .then((data) => {
        setTitle(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setStock(data.stock);
        setCategory(data?.categoryId._id);
      })
      .catch((err) => {
        const { response } = err as AxiosError;
        if (response) {
          setError("Une erreur est survenue lors de la récupération du produit");
        }
      });
  }, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateProduct(id, { name: title, description, price, stock, category });
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
        className="bg-[#FFFFFF] w-2/5 py-12 px-10 rounded-2xl shadow-md"
      >
        <h1 className="text-4xl font-bold mb-7">Modifier un produit</h1>
        <input
          type="text"
          placeholder="Nom du produit"
          name="name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-[#FAFAFA] px-6 py-4 block mb-6 w-full rounded-lg text-[#101010]"
          required
        />
        <input
          type="text"
          placeholder="Description du produit"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-[#FAFAFA] px-6 py-4 block mb-6 w-full rounded-lg text-[#101010]"
          required
        />
        <input
          type="number"
          placeholder="Prix"
          name="price"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          className="bg-[#FAFAFA] px-6 py-4 block mb-6 w-full rounded-lg text-[#101010]"
          required
        />
        <input
          type="number"
          placeholder="Stock"
          name="stock"
          value={stock}
          onChange={(e) => setStock(parseInt(e.target.value))}
          className="bg-[#FAFAFA] px-6 py-4 block mb-6 w-full rounded-lg text-[#101010]"
          required
        />
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-[#FAFAFA] px-6 py-4 block mb-6 w-full rounded-lg text-[#101010]"
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
        <button className="bg-indigo-500 px-4 py-2 w-full rounded-sm text-white">Modifier</button>
      </form>
    </div>
  );
}
