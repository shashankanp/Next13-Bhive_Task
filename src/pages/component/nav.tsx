"use client";

import React from "react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../utils/firebase";
import dynamic from "next/dynamic";
import Logo from "../../../public/bhive_logo.png";
import Image from "next/image";

function Nav() {
  const [user, loading] = useAuthState(auth);

  return (
    <nav>
      {!user && (
        <div className="flex justify-between items-center py-0">
          <Link href="/">
            <Image alt="logo" src={Logo} className="w-10 h-12" />
          </Link>
          <Link
            className="bg-teal-500 rounded-lg py-2 px-4 font-medium text-lg ml-8 text-white"
            href="/auth/login"
          >
            Join Now!
          </Link>
        </div>
      )}
      {user && (
        <div className="flex justify-between items-center py-0">
          <Link href="/dashboard">
            <Image alt="logo" src={Logo} className="w-10 h-12" />
          </Link>
          <div>
            <div className="dropdown inline-block relative">
              <Link href={"/dashboard"}>
                <img
                  src={`${user.photoURL}`}
                  alt="avatar"
                  referrerPolicy="no-referrer"
                  className="rounded-full w-12 mx-auto"
                />
              </Link>
              <h2>{user.displayName}</h2>
              <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                <li>
                  <Link
                    className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                    href="/form"
                  >
                    Form
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => auth.signOut()}
                    className="rounded-b bg-gray-200 hover:bg-gray-400  py-2 px-4 block text-black font-medium whitespace-no-wrap"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default dynamic(() => Promise.resolve(Nav), { ssr: false });
