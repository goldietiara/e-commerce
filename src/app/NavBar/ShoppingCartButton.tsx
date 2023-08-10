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
      <div className=" dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-square btn-ghost">
          <div className=" indicator p-[0.2rem]">
            <FaShoppingCart className=" text-xl shrink-0" />
            <span className=" badge px-[0.3rem] py-2 text-xs indicator-item rounded-full bg-red-600 text-white">
              {cart?.size || 0}
            </span>
          </div>
        </label>
        <div
          tabIndex={0}
          className="card dropdown-content card-compact m-3 w-52 bg-base-100 shadow z-30"
        >
          <div className=" card-body">
            <span className=" text-lg font-bold">{cart?.size || 0} Items</span>
            <span className=" text-info">
              Subtotal {formatPrice(cart?.subtotal || 0)}
            </span>
            <div className=" card-actions">
              <Link
                href={"/cart"}
                className=" btn btn-primary btn-block"
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
