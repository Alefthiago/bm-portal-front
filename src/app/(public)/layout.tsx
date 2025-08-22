//      UTIL.       //
import type { Metadata } from "next";
//     /UTIL.       //

//      META.       //
export const metadata: Metadata = {
    title: 'BM Portal',
    description: 'Manual do usuário, sistemas e informações sobre a BM Informática',
};
//     /META.       //

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <section className="w-full max-w-sm md:max-w-3xl mt-8">
                {children}
            </section>
        </main >
    );
}