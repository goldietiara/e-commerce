"use client";
import React, { useState, useTransition } from "react";
import { FaShoppingCart } from "react-icons/fa";

interface props {
  productId: string;
  incrementProductQuantity: (productId: string) => Promise<void>;
}

function AddToCartButton({ productId, incrementProductQuantity }: props) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex w-full items-center gap-2">
      <button
        className=" btn-primary btn w-full"
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProductQuantity(productId);
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 3000);
          });
        }}
      >
        {!isPending && !success && (
          <span className="flex gap-1">
            Add to Cart <FaShoppingCart />
          </span>
        )}
        {isPending && <span className="loading loading-spinner loading-md" />}
        {!isPending && success && (
          <span className=" text-success">Added to Cart</span>
        )}
      </button>
    </div>
  );
}

export default AddToCartButton;
