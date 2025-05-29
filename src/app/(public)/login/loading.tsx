//      UTIL.       //
import Image from "next/image";
//     /UTIL.       //

export default function Loading() {
    return (
        <Image
            priority
            src={`/logo.ico`}
            alt="Logo"
            width={100}
            height={100}
            className={`mx-auto mb-4 animate-bounce`}
        />
    );
}   