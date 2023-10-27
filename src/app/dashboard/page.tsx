"use client";

import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";

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

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const fetchProducts = async () => {
    const res = await axios.get("/api/products");
    const { data } = res;
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-10">
      <div className="my-10">
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </div>
      {products.length === 0 ? (
        <div className="bg-white py-8 px-12 rounded-xl grid grid-cols-1 divide-y">
          <div className="text-center text-xl font-semibold">
            <p>
              Aucun produit trouvé, commencer par{" "}
              <Link href="/products/add" className="text-indigo-500">
                ajouter un produit ici.
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-5 h-56">
            <h1 className="text-2xl font-bold mb-4 px-2">3 dérniers produits</h1>
            {/* afficher uniquement les 3 derniers pdt */}
            {products.slice(0, 3).map((product) => (
              <div key={product._id} className="flex justify-between p-2">
                <h2 className="text-lg">{product.name}</h2>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg p-5 h-56">
            <h1 className="text-2xl font-bold mb-4 px-2">Produits plus de 100€</h1>
            {/* afficher uniquement les pdt plus de 100€ */}
            {products
              .filter((product) => product.price > 100)
              .map((product) => (
                <div key={product._id} className="flex justify-between p-2">
                  <h2 className="text-lg">{product.name}</h2>
                </div>
              ))}
          </div>
          <div className="bg-white rounded-lg p-5 h-56">
            <h1 className="text-2xl font-bold mb-4 px-2">Nombre des produits total</h1>
            <h2 className="text-lg p-2 font-semibold">{products.length}</h2>
          </div>
        </div>
      )}
    </div>
  );
}
