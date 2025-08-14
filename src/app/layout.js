import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/redux/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Weather App",
  description: "Built with React, Redux, and NextJS.",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="w-screen h-screen flex flex-col items-center justify-center">
            {children}
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
