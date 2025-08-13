import { ThemeProvider } from "@/components/theme-provider";

import { Button } from "@/components/ui/button";
import Header from "./_dashboardComponents/Header";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="w-screen h-screen ">
                <Header/>
              
              {children}
            </div>
          </ThemeProvider>
          </>
        </body>
      </html>
    </>
  );
}
