"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

// Get Product by ID
const getProduct = async (id: string) => {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
};

export default function EditProduct({ params }: { params: { id: string } }) {
  const { id } = params;

  const router = useRouter();
  const [data, setData] = useState({
    _id: "",
    userId: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    categoryId: { name: "" },
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });

  useEffect(() => {
    getProduct(id)
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        alert("Error fetching product");
      });
  }, [id]);

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
              router.push("/products");
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

  console.log(data);

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex flex-col items-center">
      <div className="bg-[#FFFFFF] w-1/5 py-12 px-10 rounded-2xl shadow-md justify-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-7">{data.name}</h1>
        <p>{data.description}</p>
        <p>Prix: {data.price}€</p>
        <p>Stock: {data.stock}</p>
        {data.categoryId && <p>Catégorie: {data.categoryId.name}</p>}
        <button
          className="bg-red-500 px-4 py-2 rounded-md text-white mt-10"
          onClick={() => deleteProduct(data._id)}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}
