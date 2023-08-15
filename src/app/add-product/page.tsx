import AddProductButton from "@/components/AddProductButton";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Add Product - Owy Shoppy",
};

const addProduct = async (formData: FormData) => {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
};

const AddProductPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  return (
    <main className="flex flex-col gap-5">
      <h1 className="mb-5 text-xl font-bold text-primary lg:text-center">
        Add Product
      </h1>
      <form className="flex flex-col gap-5" action={addProduct}>
        <input
          required
          name="name"
          type="text"
          placeholder="Product Name"
          className="border-netural  w-full border-b-2 bg-base-100 p-3 outline-none focus:border-primary"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="border-netural  w-full border-b-2 bg-base-100 p-3 outline-none focus:border-primary"
        />
        <input
          required
          name="imageUrl"
          type="url"
          placeholder="Image Url"
          className="border-netural  w-full border-b-2 bg-base-100 p-3 outline-none focus:border-primary"
        />
        <input
          required
          name="price"
          type="number"
          placeholder="Price"
          className="border-netural  w-full border-b-2 bg-base-100 p-3 outline-none focus:border-primary"
        />
        <AddProductButton className=" btn-block">Add Product</AddProductButton>
      </form>
    </main>
  );
};

export default AddProductPage;
