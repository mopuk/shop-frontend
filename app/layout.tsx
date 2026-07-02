import Header from "@/components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full bg-gray-900 px-6 py-4">
        <Header />
        {children}
      </body>
    </html>
  );
}
