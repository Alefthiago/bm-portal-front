//      UTIL.       //
import Image from "next/image";
//     /UTIL.       //

export default function Loading() {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen">
            <Image
                priority
                src={`/logo.ico`}
                alt="Logo"
                width={100}
                height={100}
                className={`mx-auto mb-4 animate-bounce`}
            />
        </section>
    );
}   