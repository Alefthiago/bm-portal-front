//      UTIL.       //
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
//     /UTIL.       //

//      COMPONENTS.     //
import { ArrowLeftCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
//     /COMPONENTS.     //

//      META.       //
export const metadata: Metadata = {
    title: 'Página não encontrada',
    description: 'A página que você está procurando não existe.',
};
//     /META.       //

export default function NotFound() {
    return (
        <main>
            <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
                <ModeToggle />
                <div className="wf-ull lg:w-1/2">
                    <p className="text-sm font-medium text-blue-500 dark:text-blue-400">Erro 404</p>
                    <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">Página não encontrada</h1>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                        Parece que você se perdeu no caminho 😅
                    </p>

                    <div className="flex items-center mt-6 gap-x-3">
                        <Link href={`/`}>
                            <Button className={`cursor-pointer`}>
                                <ArrowLeftCircleIcon /> Volte para tela inicial
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
                    <Image
                        src={`./404.svg`}
                        width={100}
                        height={100}
                        alt="404"
                        className={`w-full max-w-lg lg:mx-auto`}
                    />
                </div>
            </div>
        </main>
    );
};