"use client";

import { auth } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  console.log(user);
  if (loading) return <h1 className="text-3xl">Loading...</h1>;
  if (!user) route.push("/auth/login");
  if (user)
    return (
      <div>
        <h1 className="text-4xl mt-10">
          Welcome to your dashboard {user?.displayName}!
        </h1>
        <button
          onClick={() => auth.signOut()}
          className="bg-teal-500 py-2 px-6 rounded-xl mt-10 text-white font-medium"
        >
          Sign Out :(
        </button>
      </div>
    );
}
