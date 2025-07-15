import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/sections/Navbar";
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AuthProvider } from "@/context/authContext";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://anonify.chat"),
  title: 'Anonify – Send Anonymous Feedback Securely Worldwide',
  description: 'Send anonymous feedback securely with Anonify — the global tool for creators, teams, and individuals. No sign-up required.',
  keywords: 'anonymous feedback, send anonymous feedback, anonymous suggestion box, feedback tool for creators, anonymous feedback US, anonymous feedback UK, secure feedback form, send feedback anonymously, Anonify',
  authors: [{ name: 'Deepak Nehra', url: 'https://www.linkedin.com/in/deepak-nehra/' }],
  icons: '/favicon.ico',
  openGraph: {
    title: 'Anonify – Honest Feedback Platform',
    description: 'Simple, secure, and anonymous feedback system for everyone.',
    url: 'https://anonify.chat',
    siteName: 'Anonify',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Anonify Open Graph Image',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anonify',
    description: 'Get anonymous feedback in seconds!',
    images: ['/og-image.png'],
    creator: '@nehra416',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://anonify.chat" />
        <meta name="theme-color" content="#111827" />
        <link rel="icon" href="/favicon.ico" />

        <Script id="ld-json" type="application/ld+json" strategy="beforeInteractive">
          {
            JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Anonify",
              url: "https://anonify.chat",
              description: "Get anonymous feedback and responses without revealing identity.",
              applicationCategory: "Communication",
            })
          }
        </Script>


        {/* Google Analytics 4 */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-HESGGREJLG"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HESGGREJLG');
          `}
        </Script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider defaultTheme="system" attribute={"class"} enableSystem>
            <Navbar />
            {children}
            <Analytics mode="production" />
            <SpeedInsights />
            <Toaster position="top-center" />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
