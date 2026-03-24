import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Agent Threat Matrix",
  description:
    "A structured framework for classifying, detecting, and defending against attacks on AI agent systems. 9 tactics, 57 techniques, 34 attack classes.",
  openGraph: {
    title: "AI Agent Threat Matrix",
    description: "9 tactics. 57 techniques. 34 attack classes. The MITRE ATT&CK equivalent for AI agents.",
    type: "website",
    url: "https://threats.opena2a.org",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Threat Matrix",
    description: "9 tactics. 57 techniques. 34 attack classes.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#051329] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
