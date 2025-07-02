import SocialMedia from '@/components/ui/social-media';
import { Copyright } from 'lucide-react';

export default function Footer() {
    return (
        <footer>
            <div className="container flex flex-col items-center justify-between p-2 mx-auto">
                <div className="hover:underline cursor-pointer mt-2 text-[10px]">
                    <Copyright className="inline w-4 h-4 mr-1" />
                    2025 BM Informática Ltda
                </div>

                <div className="flex -mx-2">
                    <SocialMedia />
                </div>
            </div>
        </footer>
    )
}