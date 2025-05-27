//      UTIL.       //
import type { Metadata } from "next";
//     /UTIL.       //

//      COMPONENTS.     //
import { ModeToggle } from "@/components/mode-toggle";
//     /COMPONENTS.     //

//      META.       //
export const metadata: Metadata = {
    title: 'BM Portal',
    description: 'Manual do usuário do BM Portal',
};
//     /META.       //

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-5 pb-20 sm:p-15 font-[family-name:var(--font-geist-sans)]">
            <ModeToggle />
            <section>
                {children}
            </section>
        </main >
    );
}