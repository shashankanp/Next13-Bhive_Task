"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Confetti from "react-confetti";
import { number } from "yup";

export default function Success() {
  const searchParams = useSearchParams();
  const [pieces, setPieces] = useState(200);

  const stopConfetti = () => {
    setTimeout(() => {
      setPieces(0);
    }, 3000);
  };

  useEffect(() => {
    stopConfetti();
  }, []);

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg w-3/4 text-gray-700 p-16 text-center">
        <h1 className="text-3xl pb-4 font-medium">
          Thank you for submitting your data!✨
        </h1>
        <p className="text-2xl pt-4 font-medium">
          Check out your dashboard to see your info
        </p>
      </div>
      <Confetti gravity={0.2} numberOfPieces={pieces} />
    </main>
  );
}
