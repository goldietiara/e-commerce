import { getCart } from "@/lib/db/cart";
import React from "react";
import CartEntry from "./CartEntry";
import { revalidatePath } from "next/cache";
import { setProductQuantity } from "./actions";
import Link from "next/link";
import { formatPrice } from "@/lib/format";

export const metadata = {
  title: "Cart | Owy Shoppy",
};

const page = async () => {
  const cart = await getCart();
  return (
    //PR
    <div className=" flex flex-col md:flex-row relative lg:mx-20 lg:gap-10 md:gap-5">
      <div className="w-full">
        {cart?.items.length ? (
          <>
            <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
            <div>
              {cart?.items.map((v) => {
                return (
                  <CartEntry
                    key={v.id}
                    cartItem={v}
                    setProductQuantity={setProductQuantity}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <>
            <h1 className="mb-6 text-3xl font-bold">
              Your Shopping Cart is empty
            </h1>
            <Link href={"/"} className=" link link-info hover:text-sky-900">
              Shop today&apos;s deals
            </Link>
          </>
        )}
      </div>
      <div className="w-full md:max-w-xs h-fit p-5 md:shadow-xl sticky bottom-0 md:top-28 bg-base-100">
        <p className=" mb-3">
          Subtotal ({cart?.size} items):{" "}
          <span className=" font-semibold">
            {formatPrice(cart?.subtotal || 0)}
          </span>
        </p>
        <button className="btn btn-primary w-full">Proceed to checkout</button>
      </div>
    </div>
  );
};

export default page;
