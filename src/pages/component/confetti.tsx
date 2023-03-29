import React from "react";
import confetti from "../confetti.json";
import Lottie from "lottie-react";

export default function Confetti() {
  return <Lottie animationData={confetti} />;
}
