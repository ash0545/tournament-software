import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout_check from "./layout_check";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
//created Layout_check beacuse "use client" for client server hook can't be used in same page of export metadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <SidebarProvider className="flex">
            <div>
              <Layout_check />
            </div>
            <div className="w-full">
              <SidebarTrigger />
              {children}
            </div>
          </SidebarProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
