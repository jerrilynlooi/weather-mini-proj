import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Weather App",
  description: "Built with React, Redux, and NextJS.",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
          <div className="w-screen min-h-screen h-full flex flex-col items-center justify-start">
            {children}
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
