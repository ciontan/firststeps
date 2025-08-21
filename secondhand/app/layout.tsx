import type { Metadata } from "next";
import { NEXT_PUBLIC_URL } from "./config";

import "./global.css";
import "@coinbase/onchainkit/styles.css";
import OnchainProviders from "./components/OnchainProvidersClient";

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Secondhand",
  description: "Buy and sell pre-loved items for your little ones",
  openGraph: {
    title: "Secondhand",
    description: "Buy and sell pre-loved items for your little ones",
    images: [`${NEXT_PUBLIC_URL}/images/logo.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center">
        <OnchainProviders>{children}</OnchainProviders>
      </body>
    </html>
  );
}
