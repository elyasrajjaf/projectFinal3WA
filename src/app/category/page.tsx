"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

interface Category {
  _id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

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

  const deleteCategory = async (id: string) => {
    confirmAlert({
      title: "Supprimer la catégorie",
      message: "Êtes-vous sûr de vouloir supprimer cette catégorie ?",
      buttons: [
        {
          label: "Oui",
          onClick: async () => {
            try {
              await axios.delete(`/api/category/${id}`);
              setCategories(categories.filter((category) => category._id !== id));
            } catch (error) {
              console.error("Error deleting category:", error);
            }
          },
        },
        {
          label: "Non",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Catégories</h1>
        <Link href="/products/add" className="bg-indigo-500 px-4 py-2 rounded-md text-white">
          Ajouter une catégorie
        </Link>
      </div>
      <div className="bg-white py-8 px-12 rounded-xl grid grid-cols-1 divide-y">
        {categories.length === 0 && (
          <div className="text-center text-xl font-semibold">
            <p>
              Aucune catégorie trouvée, commencer par{" "}
              <Link href="/category/add" className="text-indigo-500">
                ajouter une ici.
              </Link>
            </p>
          </div>
        )}
        {categories.length >= 1 &&
          categories.map((category) => (
            <div key={category._id} className="flex justify-between mb-3 p-2 items-center">
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <div className="flex gap-4">
                <button onClick={() => deleteCategory(category._id)}>Supprimer la catégorie</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
