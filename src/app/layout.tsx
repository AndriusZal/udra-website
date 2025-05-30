import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Udra Van",
    description: "Naujas projektas kemperių entuziastams Lietuvoje.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta name="description" content={"Naujas projektas kemperių entuziastams Lietuvoje."} key="desc" />
                <meta name="og:title" content={"Udra Van"} />
                <meta name="og:description" content={"Naujas projektas kemperių entuziastams Lietuvoje."} />
                <meta name="twitter:title" content={"Udra Van"} />
                <meta name="twitter:description" content={"Naujas projektas kemperių entuziastams Lietuvoje."} />

                <meta name="og:image" content={"logo.svg"} />
                <meta name="og:url" content="https://udravan.com" />
                <meta name="og:type" content="website" />
                <meta name="og:site-name" content="Udra Van" />
                <meta name="twitter:image" content={"logo.svg"} />
                <meta name="twitter:card" content="summary_large_image" />

                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </head>
            <body>{children}</body>
        </html>
    );
}
