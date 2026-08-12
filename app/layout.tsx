import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "小舟学习中枢｜家庭 AI 学习智能体",
  description: "面向儿童学习习惯养成的家庭智能中枢交互样板间",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "小舟学习中枢",
    description: "让好习惯，在家里自然发生",
    images: [{ url: "/og.png", width: 1728, height: 909, alt: "小舟学习中枢" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "小舟学习中枢",
    description: "让好习惯，在家里自然发生",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
