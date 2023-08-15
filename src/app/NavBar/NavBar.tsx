import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import ShoppingCartButton from "./ShoppingCartButton";
import { getCart } from "@/lib/db/cart";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { HiSearch } from "react-icons/hi";

async function searchProducts(formData: FormData) {
  "use server";
  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect(`/search?query=${searchQuery}`);
  }
}

const NavBar = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  const cart = await getCart();

  return (
    <div className="bg-base-100 py-2">
      <div className=" navbar m-auto flex max-w-7xl justify-between gap-0 md:gap-2">
        <div className="flex gap-0 md:justify-between md:gap-10">
          <Link href={"/"} className=" btn-ghost btn text-xl normal-case">
            <div className=" grid w-[30px] grid-cols-1 md:w-[45px]">
              <Image
                src={"/logo.png"}
                width={40}
                height={40}
                alt="logo on navbar"
                className=" col-span-1 w-full"
              />
            </div>
            <span className="hidden md:inline">Owy Shoppy</span>
          </Link>
          <form action={searchProducts}>
            <div className=" form-control">
              <input
                name="searchQuery"
                placeholder="Search here"
                className=" input-bordered input hidden w-full min-w-[100px] text-sm focus:outline-none sm:inline"
              />
            </div>
          </form>
        </div>
        <div className="flex gap-2">
          <div className="dropdown inline sm:hidden">
            <label tabIndex={0} className="btn-ghost btn-square btn">
              <HiSearch className=" shrink-0 text-2xl" />
            </label>
            <ul
              tabIndex={0}
              className=" dropdown-content menu z-50 -ml-36 -mt-14 w-52 shrink-0 bg-base-100 p-2 "
            >
              <form action={searchProducts}>
                <div className=" form-control">
                  <input
                    name="searchQuery"
                    placeholder="Search here"
                    className=" input-bordered input w-full min-w-[100px] text-sm focus:outline-none"
                  />
                </div>
              </form>
            </ul>
          </div>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
