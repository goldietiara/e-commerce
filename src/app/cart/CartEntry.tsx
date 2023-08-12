"use client";

import { CartItemWithProducts } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useTransition } from "react";
import { setProductQuantity } from "./actions";

interface Props {
  cartItem: CartItemWithProducts;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartEntry({ cartItem: { product, quantity } }: Props) {
  const [isPending, startTransition] = useTransition();
  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }

  return (
    <div>
      <div className=" flex flex-col md:flex-row gap-5">
        <Image
          src={product.imageUrl}
          alt={product.name}
          height={200}
          width={200}
          className="rounded-lg"
        />
        <div className="flex flex-col items-start justify-start h-full ">
          <Link href={`/products/${product.id}`} className=" text-lg ">
            {product.name}
          </Link>
          <div className=" font-semibold">{formatPrice(product.price)}</div>
          <div className=" my-1 flex items-center gap-2">
            Quantity:
            <select
              className=" select select-xs select-bordered w-full max-w-[80px]"
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);
                startTransition(
                  async () => await setProductQuantity(product.id, newQuantity),
                );
              }}
            >
              <option value={0}>0 (Delete)</option>
              {quantityOptions}
            </select>
            {isPending && (
              <span className=" loading loading-spinner loading-sm" />
            )}
          </div>
        </div>
      </div>
      <div className=" divider" />
    </div>
  );
}
