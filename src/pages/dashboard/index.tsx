"use client";

import { auth } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import connectMongo from "../../../utils/connectMongo";
import Input from "../../../models/inputData";

export const getServerSideProps = async () => {
  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    console.log("FETCHING DOCUMENTS");
    const inputs = await Input.find();
    console.log("FETCHED DOCUMENTS");

    return {
      props: {
        inputs: JSON.parse(JSON.stringify(inputs)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default function Dashboard({ inputs }: any) {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  if (loading) return <h1 className="text-3xl">Loading...</h1>;
  if (!user) route.push("/auth/login");

  // Filter out only the data that the current user has submitted
  function checkValid(inp: any) {
    return inp.firebase_email == user?.email;
  }
  const relInputs = inputs.filter(checkValid);

  if (user)
    return (
      <div>
        <div className="flex justify-between">
          <h1 className="text-4xl mt-10">
            Welcome to your dashboard {user?.displayName}!
          </h1>

          <button
            onClick={() => auth.signOut()}
            className="bg-teal-500 py-2 px-6 rounded-xl mt-10 text-white font-medium align-right"
          >
            Sign Out :(
          </button>
        </div>
        {/* Details */}
        <div>
          <h2 className="text-3xl mt-10">
            Here are the details that you have provided:
          </h2>
          {relInputs.map((input: any) => (
            <div className="text-2xl mt-5" key={input._id}>
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
          ))}
        </div>
      </div>
    );
}
