import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/provider";
import { ThemeProvider } from "@/app/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Attendence Mitra",
  description: "Best attendence system app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {" "}
            {children}
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
