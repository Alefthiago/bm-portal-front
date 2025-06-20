//      UTIL.       //
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
//     /UTIL.       //

//      COMPONENTS.     //
import { ThemeProvider } from "@/components/theme-provider";
import { AlertProvider } from "@/components/alert-provider";
//     /COMPONENTS.     //

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

//      META.       //
export const metadata: Metadata = {
    title: 'BM Portal',
    // description: 'Portal de para auxilar',
};
//     /META.       //

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-br" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    disableTransitionOnChange
                >
                    <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
                        <AlertProvider>
                            {children}
                        </AlertProvider>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}