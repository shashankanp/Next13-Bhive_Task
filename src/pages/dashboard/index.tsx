"use client";

import { auth } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [loadedIn, setLoadedIn] = useState(true);
  const route = useRouter();

  const [inputs, setInputs] = useState([]);

  const name = user?.displayName;
  const [displayName, setDisplayName] = useState(name);

  useEffect(() => {
    if (!loading)
      axios
        .post("/api/dashboard/fetch", {
          data: user,
        })
        .then((res: any) => {
          setInputs(res.data.data);
          setLoadedIn(false);

          console.log("user data: ", res.data.data);
        });
  }, [user]);
  if (loadedIn) return <h1 className="text-3xl">Loading...</h1>;
  if (!user) route.push("/auth/login");

  if (!loadedIn && user)
    return (
      <div>
        <h1 className="text-4xl mt-10 mb-8 flex">
          Welcome to your dashboard {displayName}!{" "}
          <AiFillEdit className="ml-3 cursor-pointer" />
        </h1>
        {/* Details */}
        {/* If data is empty */}
        {!Object.keys(inputs).length && (
          <div>
            {" "}
            <h2 className="text-3xl my-10">
              You don&apos;t have any data available yet.
            </h2>
            <Link
              className="bg-teal-500 rounded-lg py-4 bg-gradient-to-r from-green-500 to-green-700 px-6 font-medium text-lg  text-white"
              href="/form"
            >
              Fill your first form!
            </Link>
          </div>
        )}

        {/* If data exists */}

        {!loadedIn && Object.keys(inputs).length > 0 && (
          <div>
            <Link
              className="bg-teal-500 rounded-lg py-4 bg-gradient-to-r from-green-500 to-green-700 px-6 font-medium text-lg  text-white"
              href="/form"
            >
              Fill another form!
            </Link>
            <h2 className="text-3xl mt-10">
              Here is the {inputs.length} form details that you have provided:
            </h2>
            {inputs
              .slice(0)
              .reverse()
              .map((input: any) => (
                <div
                  className="text-2xl shadow-xl rounded-xl mt-4 p-10 flex justify-between max-w-4xl"
                  key={input._id}
                >
                  <div>
                    <p className="my-2">
                      <span className="font-medium">Name</span>: {input.name}
                    </p>
                    <p className="my-2">
                      <span className="font-medium">Email</span>: {input.email}
                    </p>
                    <p className="my-2">
                      <span className="font-medium">Phone</span>: {input.phone}
                    </p>
                    <p className="my-2">
                      <span className="font-medium">Opportunity</span>:{" "}
                      {input.opportunity}
                    </p>
                  </div>
                  <div>
                    <button className="bg-gray-500 rounded-lg py-3 px-6 font-medium text-lg text-white mt-14 mr-36 ">
                      Edit
                    </button>{" "}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    );
}
