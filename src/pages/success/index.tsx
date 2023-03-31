import Link from "next/link";
import Confetti from "../animations/confetti.json";
import Lottie from "lottie-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../utils/firebase";
import { useRouter } from "next/navigation";

export default function Success() {
  return (
    <main className="h-screen flex items-center justify-center relative">
      <div className=" rounded-lg w-3/4 text-gray-700 p-16 text-center ">
        <Lottie
          animationData={Confetti}
          loop={false}
          className={"inset-0 -z-10 absolute"}
        />
        <h1 className="text-3xl pb-4 font-medium">
          Thank you for submitting your data!✨
        </h1>
        <p className="text-2xl pt-4 font-medium">
          Check out your{" "}
          <Link href={"./dashboard"} className="underline">
            dashboard
          </Link>{" "}
          to see your info
        </p>
        <p className="text-2xl pt-4 font-medium">
          You can click{" "}
          <Link href={"./form"} className="underline">
            here
          </Link>{" "}
          to fill out another form{" "}
        </p>
      </div>
    </main>
  );
}
