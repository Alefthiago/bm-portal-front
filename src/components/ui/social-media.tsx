import { Linkedin, Instagram, Facebook } from "lucide-react";

export default function SocialMedia() {
    return (
        <div className="flex justify-center items-center gap-4 mt-2">
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
    );
}