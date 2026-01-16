import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Thought of the Day",
  description: "A daily dose of wisdom and motivation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors">
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
