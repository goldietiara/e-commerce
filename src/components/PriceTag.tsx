import { formatPrice } from "@/lib/format";
import React from "react";

interface props {
  price: number;
  className?: string;
}
const PriceTag = ({ price, className }: props) => {
  return (
    <span className={` text-lg font-semibold md:text-2xl ${className}`}>
      {formatPrice(price)}
    </span>
  );
};

export default PriceTag;
