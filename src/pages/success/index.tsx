import Link from "next/link";
import Confetti from "../confetti.json";
import Lottie from "lottie-react";

export default function Success() {
  return (
    <main className="h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg w-3/4 text-gray-700 p-16 text-center">
        {/* <Lottie
          animationData={Confetti}
          loop={false}
          style={{ left: 0, right: 0, width: "100%", position: "absolute" }}
        /> */}
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
