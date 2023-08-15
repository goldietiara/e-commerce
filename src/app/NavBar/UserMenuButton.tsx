"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { FiMenu } from "react-icons/fi";
import Image from "next/image";

interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;
  return (
    <div className=" dropdown-end dropdown">
      <label tabIndex={0} className="btn-ghost btn-square btn">
        {user ? (
          <Image
            src={`${user?.image}` || `/profile-pic-placeholder.png`}
            alt={`${user?.name} profile picture`}
            height={250}
            width={250}
            className=" w-8 rounded-full"
          />
        ) : (
          <FiMenu className=" shrink-0 text-xl" />
        )}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-fit bg-base-100 p-2 text-center shadow"
      >
        <li>
          {user ? (
            <button
              className=" min-w-[100px] bg-base-200 py-2 font-bold hover:bg-base-300"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out
            </button>
          ) : (
            <button
              className=" min-w-[100px] bg-base-200 py-2 font-bold hover:bg-base-300"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}
