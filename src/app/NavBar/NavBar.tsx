import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import ShoppingCartButton from "./ShoppingCartButton";
import { getCart } from "@/lib/db/cart";

async function searchProducts(formData: FormData) {
  "use server";
  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect(`/search?query=${searchQuery}`);
  }
}

const NavBar = async () => {
  const cart = await getCart();

  return (
    <div className="bg-base-100 my-2">
      <div className=" navbar max-w-7xl m-auto flex justify-between">
        <div className="felx md:gap-10 md:justify-between">
          <Link href={"/"} className=" btn btn-ghost text-xl normal-case">
            <Image
              src={"/logo.png"}
              width={40}
              height={40}
              alt="logo on navbar"
            />
            <span className="hidden md:inline">Owy Shoppy</span>
          </Link>
          <div className="flex-none gap-2 ">
            <form action={searchProducts}>
              <div className=" form-control">
                <input
                  name="searchQuery"
                  placeholder="Search here"
                  className=" input input-bordered w-full min-w-[100px] text-sm focus:outline-none"
                />
              </div>
            </form>
          </div>
        </div>
        <div>
          <ShoppingCartButton cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
