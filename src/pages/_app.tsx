import "@/styles/globals.css";
import Nav from "./component/nav";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${poppins.className} mx-14 my-5`}>
      <Nav />
      <Component {...pageProps} />
    </main>
  );
}
