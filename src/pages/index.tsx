import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>BHive Task</title>
        <meta name="description" content="Task for BHive :)" />
        <link rel="icon" type="image/png" href="/bhive_logo.png"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h2 className="text-3xl mt-10 mb-8">
          Join our amazing family of investors today!
        </h2>
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
