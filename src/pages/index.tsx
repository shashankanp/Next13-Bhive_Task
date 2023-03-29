import Head from "next/head";

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
        <h2 className="text-2xl mt-10">
          
          Join our amazing family of investors today!
        </h2>
      </main>
    </>
  );
}
