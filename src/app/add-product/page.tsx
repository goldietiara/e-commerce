import AddProductButton from "@/components/AddProductButton";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Add Product - Owy Shoppy",
};

const addProduct = async (formData: FormData) => {
  "use server";

  //PR
  const name = formData.get("name")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  const imageUrl = formData.get("imageUrl")?.toString() || "";
  const price = Number(formData.get("price") || 0);

  // if (!name || description || imageUrl || price) {
  //   throw Error("Missing required fields");
  // }
  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });
  redirect("/");
};

const AddProductPage = () => {
  return (
    <main className="flex flex-col gap-5">
      <h1 className="mb-5 text-xl lg:text-center font-bold text-primary">
        Add Product
      </h1>
      <form className="flex flex-col gap-5" action={addProduct}>
        <input
          required
          name="name"
          type="text"
          placeholder="Product Name"
          className="w-full  p-3 border-b-2 border-netural focus:border-primary bg-base-100 outline-none"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="w-full  p-3 border-b-2 border-netural focus:border-primary bg-base-100 outline-none"
        />
        <input
          required
          name="imageUrl"
          type="url"
          placeholder="Image Url"
          className="w-full  p-3 border-b-2 border-netural focus:border-primary bg-base-100 outline-none"
        />
        <input
          required
          name="price"
          type="number"
          placeholder="Price"
          className="w-full  p-3 border-b-2 border-netural focus:border-primary bg-base-100 outline-none"
        />
        <AddProductButton className=" btn-block">Add Product</AddProductButton>
      </form>
    </main>
  );
};

export default AddProductPage;
