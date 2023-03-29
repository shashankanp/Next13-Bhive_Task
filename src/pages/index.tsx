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
        <h2 className="text-3xl mt-10">
          Join our amazing family of investors today!
        </h2>
        <p className="text-2xl pt-4 font-medium">
          Click{" "}
          <Link href={"./form"} className="underline">
            here
          </Link>{" "}
          to fill out the form{" "}
        </p>
      </main>
    </>
  );
}
