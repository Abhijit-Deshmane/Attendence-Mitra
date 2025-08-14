import { ThemeProvider } from "@/components/theme-provider";

import Header from "./_dashboardComponents/Header";

export default function RootLayout({ children }) {
  return (
      <html lang="en" suppressHydrationWarning >
        <head />
        <body>
          <>

            <div>


              {children}
            </div>






          
          </>
        </body>
      </html>
  );
}
