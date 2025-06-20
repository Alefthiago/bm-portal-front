//      UTIL.       //
import type { Metadata } from "next";
//     /UTIL.       //

//      COMPONENTS.     //
import { Facebook, Linkedin, Instagram, Copyright, Loader2, Send } from "lucide-react";
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
        <main className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <section className="w-full max-w-sm md:max-w-3xl mt-8">
                {children}
                <div className="text-muted-foreground text-center text-xs text-balance mt-4">
                    <ModeToggle/>
                    <div className="flex justify-center items-center gap-4 mb-2 mt-4">
                        <a
                            href="https://br.linkedin.com/company/bm-inform-tica-ltda"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary underline underline-offset-4"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a
                            href="https://www.instagram.com/bminformaticaoficial/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary underline underline-offset-4"
                        >
                            <Instagram className="w-4 h-4" />
                        </a>
                        <a
                            href="https://www.facebook.com/bminformaticaoficial/?_rdr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary underline underline-offset-4"
                        >
                            <Facebook className="w-4 h-4" />
                        </a>
                    </div>
                    <div className="hover:underline cursor-pointer">
                        <Copyright className="inline w-4 h-4 mr-1" />
                        2025 BM Informática Ltda
                    </div>
                </div>
            </section>
        </main >
    );
}