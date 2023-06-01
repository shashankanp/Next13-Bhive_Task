"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../../utils/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

export default function Login() {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  // Sign in with Google
  const googleProvider = new GoogleAuthProvider();
  // console.log(user?.displayName, user?.email, user?.uid);
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider).then();
      console.log(result.user);
      route.push("/dashboard");
    } catch (error: any) {
      console.log(error);
    }
  };

  // Sign in with Microsoft
  const microProvider = new OAuthProvider("microsoft.com");
  microProvider.setCustomParameters({
    prompt: "consent",
    tenant: "696e5350-ad97-4434-9554-59207481a1ed",
  });
  const MicrosoftLogin = async () => {
    try {
      const result = await signInWithPopup(auth, microProvider).then();
      console.log("User:", result.user);
      route.push("/dashboard");
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      axios
        .post("/api/user/add", {
          firebase_name: user?.displayName,
          firebase_mail: user?.email,
          firebase_uid: user?.uid,
        })
        .then((response) => {
          console.log("Firebase User Success:", response);
          return response.data;
        })
        .catch((err) => console.log("Firebase User Error:", err));
        route.push("/dashboard");
    } else {
      // console.log("Login Please");
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
        <button
          onClick={MicrosoftLogin}
          className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2 "
        >
          <FaMicrosoft className="text-2xl text-blue-500" />
          Sign in with Microsoft
        </button>
      </div>
    </div>
  );
}
