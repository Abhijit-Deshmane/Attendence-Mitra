import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/provider";


export const metadata = {
  title: "Attendence Mitra",
  description: "Best attendence system app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={"antialiased"}
      >
        <Providers> {children} </Providers>
        
      </body>
    </html>
  );
}
