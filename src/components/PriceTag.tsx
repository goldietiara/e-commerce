import { formatPrice } from "@/lib/format";
import React from "react";

interface props {
  price: number;
  className?: string;
}
const PriceTag = ({ price, className }: props) => {
  return <span className={` badge ${className}`}>{formatPrice(price)}</span>;
};

export default PriceTag;
