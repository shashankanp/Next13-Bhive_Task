import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>BHive Task</title>
        <meta name="description" content="Task for BHive :)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h2 className="text-2xl mt-10">
          Join our amazing family of investors today!
        </h2>
      </main>
    </>
  );
}
