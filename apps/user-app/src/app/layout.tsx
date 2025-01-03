import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./provider";
import AppBarClient  from "./app-bar-client";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finly.",
  description: "Your Digital Wallet for the Modern World.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
        <Providers>
            <body className={inter.className}>
              <AppBarClient/>
              {children}
            </body>
        </Providers>
    </html>
  );
}
