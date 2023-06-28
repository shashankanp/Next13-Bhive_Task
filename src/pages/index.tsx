import Head from "next/head";
import Link from "next/link";
import Stonks from "./animations/stonks.json";
import Lottie from "lottie-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Building from "../../public/white.jpg";

import { useState, useEffect } from "react";

export default function Home() {
  const [isLoading, setIsloading] = useState(true);
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (user) setIsloading(false);
  }, [user]);

  const router = useRouter();
  if (user) {
    router.push("/dashboard");
  } else
    return (
      <>
        <Head>
          <title>BHive Task</title>
          <meta name="description" content="Task for BHive :)" />
          <link rel="icon" type="image/png" href="/bhive_logo.png"></link>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <main>
          <h2 className="text-3xl mt-10 mb-10">
            Join our amazing family of investors today!
          </h2>
          <Lottie
            animationData={Stonks}
            loop={false}
            className={
              "inset-0 -z-10 absolute mt-40 -mb-20 mx-auto my-auto overflow-hidden"
            }
          />
          <Link
            className="bg-teal-500 rounded-lg py-4 bg-gradient-to-r from-green-500 to-green-700 px-6 font-medium text-lg  text-white"
            href="/auth/login"
          >
            Fill your first form!
          </Link>
        </main>
      </>
    );
}
