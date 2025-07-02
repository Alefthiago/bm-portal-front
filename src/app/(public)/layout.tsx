//      UTIL.       //
import type { Metadata } from "next";
//     /UTIL.       //

//      COMPONENTS.     //
import { Copyright } from "lucide-react";
import SocialMedia from "@/components/ui/social-media";
import { ModeToggle } from "@/components/mode-toggle";
//     /COMPONENTS.     //

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
                <div className="text-muted-foreground text-center text-xs text-balance mt-4">
                    <ModeToggle />
                    <SocialMedia />
                    <div className="hover:underline cursor-pointer mt-2">
                        <Copyright className="inline w-4 h-4 mr-1" />
                        2025 BM Informática Ltda
                    </div>
                </div>
            </section>
        </main >
    );
}