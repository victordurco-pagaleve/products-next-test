import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Products Test",
  description: "Next.js test project do list products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${quicksand.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
