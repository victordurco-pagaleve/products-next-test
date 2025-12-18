import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Link from "next/link";

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
        <nav className="flex justify-center gap-4 border-b-2 bg-secondary">
          <Link href="/products/client-side" className="border-b-2 border-transparent hover:border-primary">Client-Side</Link>
          <div className="w-1 h-6 bg-primary inline-block"></div>
          <Link href="/products/server-side" className="border-b-2 border-transparent hover:border-primary">Server-Side</Link>
          <div className="w-1 h-6 bg-primary inline-block"></div>
          <Link href="/products/server-actions" className="border-b-2 border-transparent hover:border-primary">Server Actions</Link>
        </nav>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
