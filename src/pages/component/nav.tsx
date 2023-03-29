"use client";

import React from "react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../utils/firebase";
import dynamic from "next/dynamic";
import Logo from "../../../public/bhive_logo.png";
import Image from "next/image";
import { BsFillMoonStarsFill } from "react-icons/bs";

function Nav(props: any) {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className="flex justify-between items-center py-0 ">
      <Image alt="logo" src={Logo} className="w-10 h-12" />
      {!user && (
        <div className="flex justify-between">
          <div className="cursor-pointer text-2xl my-auto mr-10 dark:text-white">
            <BsFillMoonStarsFill
              onClick={() => {
                props.handleCLick(!props.dark);
                console.log(!props.dark);
              }}
            />
          </div>
          <Link
            className="bg-teal-500 rounded-lg py-2 px-4 font-medium text-lg ml-8 text-white"
            href="/auth/login"
          >
            Join Now!
          </Link>
        </div>
      )}
      {user && (
        <div className="flex justify-between">
          <div className="cursor-pointer text-2xl my-auto mr-10 dark:text-white">
            <BsFillMoonStarsFill
              onClick={() => {
                props.handleCLick(!props.dark);
                console.log(!props.dark);
              }}
            />
          </div>

          <div className="block">
            <Link href={"/dashboard"}>
              <img
                src={`${user.photoURL}`}
                alt="avatar"
                referrerPolicy="no-referrer"
                className="rounded-full w-12 mx-auto"
              />
            </Link>
            <h2>{user.displayName}</h2>
          </div>
        </div>
      )}
    </nav>
  );
}

export default dynamic(() => Promise.resolve(Nav), { ssr: false });
