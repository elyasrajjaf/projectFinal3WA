"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

// Définir un type pour les produits
interface Product {
  _id: string;
  userId: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const fetchProducts = async () => {
    const res = await axios.get("/api/products");
    const { data } = res;
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    confirmAlert({
      title: "Confirmation",
      message: "Êtes-vous sûr de vouloir supprimer ce produit ?",
      buttons: [
        {
          label: "Oui",
          onClick: async () => {
            try {
              await axios.delete(`/api/products/${id}`);
              fetchProducts();
            } catch (error) {
              console.error("Error deleting product:", error);
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
        <h1 className="text-4xl font-bold">Products</h1>
        <Link href="/products/add" className="bg-indigo-500 px-4 py-2 rounded-md text-white">
          Ajouter un produit
        </Link>
      </div>
      <div className="bg-white py-8 px-12 rounded-xl grid grid-cols-1 divide-y">
        {products.length === 0 && (
          <div className="text-center text-xl font-semibold">
            <p>
              Aucun produit trouvé, commencer par {" "}
              <Link href="/products/add" className="text-indigo-500">
               ajouter un produit ici.
              </Link>
            </p>
          </div>
        )}
        {products.length >= 1 &&
          products.map((product) => (
            <div key={product._id} className="flex justify-between mb-3 p-2 items-center">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <div className="flex gap-4">
                <Link
                  href={`/products/view/${product._id}`}
                  className="bg-green-600 px-4 py-2 rounded-md text-white"
                >
                  Voir le produit
                </Link>
                <Link
                  href={`/products/edit/${product._id}`}
                  className="bg-blue-500 px-4 py-2 rounded-md text-white"
                >
                  Modifier
                </Link>
                <button
                  className="bg-red-500 px-4 py-2 rounded-md text-white"
                  onClick={() => deleteProduct(product._id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
