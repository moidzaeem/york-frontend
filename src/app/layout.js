import { Inter } from "next/font/google";
import "./globals.css";

// I will delete "inter" later
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "York CRM",
  description: "York CRM",
  icons: {
    icon: '/york-favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html className="dar k" lang="en">
      <body className={`antialiased ${inter.className}`} data-drawers="0">{children}</body>
    </html>
  );
}
