import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/provider";
import { ThemeProvider } from "@/components/theme-provider";


export const metadata = {
  title: "Attendence Mitra",
  description: "Best attendence system app",
};

export default function RootLayout({ children }) {
  return (
      <> 
    <html lang="en" suppressHydrationWarning>
      <body
      >


    <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            
        <Providers> {children} </Providers>
              
          </ThemeProvider>






            
        






















        
      </body>
    </html>
        </>
  );
}
