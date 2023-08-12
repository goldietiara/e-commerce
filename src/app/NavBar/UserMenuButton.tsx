"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import {FiMenu} from "react-icons/fi"
import Image from "next/image";

interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;
  return (
    <div className=" dropdown-end dropdown">
      <label tabIndex={0} className="btn btn-ghost btn-square">
        {user ? (
          <Image
            src={`${user?.image}` || `/profile-pic-placeholder.png`}
            alt={`${user?.name} profile picture`}
            height={250}
            width={250}
            className=" w-8 rounded-full"
          />
        ) : (
          <FiMenu className=" text-xl shrink-0" />

        )}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu w-fit rounded-box menu-sm z-30 mt-3 bg-base-100 p-2 shadow text-center"
      >
        <li>
          {user ? (
            <button 
            className=" min-w-[100px] bg-base-200 hover:bg-base-300 py-2 font-bold"
            onClick={() => signOut({ callbackUrl: "/" })}>
              Sign Out
            </button>
          ) : (
            <button
            className=" min-w-[100px] bg-base-200 hover:bg-base-300 py-2 font-bold"
            onClick={() => signIn()}>Sign In</button>
          )}
        </li>
      </ul>
    </div>
  );
}
