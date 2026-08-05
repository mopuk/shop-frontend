import Header from "@/src/components/layout/Header";
import "./globals.css";
import { Montserrat, Hanken_Grotesk } from "next/font/google";
import { cn } from "@/src/lib/utils";
import ThemeProvider from "@/src/components/providers/ThemeProvider";
import QueryProvider from "./providers";
import Footer from "@/src/components/layout/Footer";

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
        <ThemeProvider attribute="class" enableSystem={false}>
          <QueryProvider>
            <Header />
            {children}
            <Footer />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
