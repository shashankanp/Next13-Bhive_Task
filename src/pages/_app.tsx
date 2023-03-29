import "@/styles/globals.css";
import Nav from "./component/nav";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { useState } from "react";

const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <main
      className={`${poppins.className} ${
        darkMode ? "dark" : ""
      } mx-14 my-5 `}
    >
      <Nav dark={darkMode} handleCLick={setDarkMode} />
      <Component {...pageProps} />
    </main>
  );
}
