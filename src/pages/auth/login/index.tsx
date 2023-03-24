"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../../utils/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Login() {
  const [user, loading] = useAuthState(auth);

  // Sign in with Google
  const route = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // console.log(result.user);
      route.push("/form");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      <h1 className="mx-10 my-10 text-4xl">You are already logged in...</h1>;
      route.push("/form");
    } else {
      console.log("Login");
    }
  }, [user]);

  return (
    <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg max-w-sm mx-auto">
      <h2 className="text-3xl font-medium">Join Today</h2>
      <div className="py-4">
        <h3 className="py-4">Sign in with one of the providers:</h3>
      </div>
      <div className="flex flex-col gap-4">
        <button
          onClick={GoogleLogin}
          className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2 "
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>
        <button className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2 ">
          <FaMicrosoft className="text-2xl text-blue-500" />
          Sign in with Microsoft
        </button>
      </div>
    </div>
  );
}
