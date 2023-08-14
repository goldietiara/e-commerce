"use client";
import { ShoppingCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

interface ShoppingCartButtonProps {
  cart: ShoppingCart | null;
}

const ShoppingCartButton = ({ cart }: ShoppingCartButtonProps) => {
  const closeDropDown = () => {
    const element = document.activeElement as HTMLElement;
    if (element) {
      element.blur();
    }
  };

  return (
    <>
      <div className=" dropdown-end dropdown">
        <label tabIndex={0} className="btn-ghost btn-square btn">
          <div className=" indicator p-[0.2rem]">
            <FaShoppingCart className=" shrink-0 text-xl" />
            <span className=" badge indicator-item rounded-full bg-red-600 px-[0.3rem] py-2 text-xs text-white">
              {cart?.size || 0}
            </span>
          </div>
        </label>
        <div
          tabIndex={0}
          className="card dropdown-content card-compact z-30 m-3 w-52 bg-base-100 shadow"
        >
          <div className=" card-body">
            <span className=" text-lg font-bold">{cart?.size || 0} Items</span>
            <span className=" text-info">
              Subtotal {formatPrice(cart?.subtotal || 0)}
            </span>
            <div className=" card-actions">
              <Link
                href={"/cart"}
                className=" btn-primary btn-block btn"
                onClick={closeDropDown}
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCartButton;
