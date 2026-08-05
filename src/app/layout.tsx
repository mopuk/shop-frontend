import Header from "@/src/components/layout/Header";
import "./globals.css";
import { Montserrat, Hanken_Grotesk } from "next/font/google";
import { cn } from "@/src/lib/utils";
import Providers from "./providers";
import Footer from "@/src/components/layout/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-monstserrat",
});
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(montserrat.variable, hanken.variable)}>
      <body className="min-h-full">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>

        <SpeedInsights />
      </body>
    </html>
  );
}
