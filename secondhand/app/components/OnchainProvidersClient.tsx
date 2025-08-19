"use client";
import dynamic from "next/dynamic";

const OnchainProviders = dynamic(() => import("./OnchainProviders"), {
  ssr: false,
});

export default OnchainProviders;
