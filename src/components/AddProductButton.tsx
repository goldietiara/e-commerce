"use client";
import React from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type Props = {
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<"button">;

const AddProductButton = ({ children, className, ...props }: Props) => {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      className={` btn btn-primary${className}`}
      type="submit"
      disabled={pending}
    >
      {pending && <span className=" loading loading-dots" />}
      {children}
    </button>
  );
};

export default AddProductButton;
