"use client";
//      COMPONENTS.     //
import { User2Icon } from "lucide-react";
import { LoginForm } from "@/components/forms/form-login";
import { Copyright } from "lucide-react";
import FormLoginSupport from "@/components/forms/form-login-suport";
import SocialMedia from "@/components/ui/social-media";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useEffect, useState } from "react";
//     /COMPONENTS.     //

export default function loginPage() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "s") {
        event.preventDefault()
        setIsOpenModal(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, []);

  return (
    <section>
      <div className={`w-full flex justify-center mb-2`}>
        <Button variant="ghost" size="icon" className={`cursor-pointer`} onClick={() => setIsOpenModal(true)}>
          <User2Icon />
        </Button>
      </div>
      <LoginForm />
      <div className="text-muted-foreground text-center text-xs text-balance mt-4">
        <ModeToggle />
        <SocialMedia />
        <a href="https://alefthiago.github.io/bm-site/" target="_blank">
          <div className="hover:underline cursor-pointer mt-2">
            <Copyright className="inline w-4 h-4 mr-1" />
            2025 BM Informática Ltda
          </div>
        </a>
        <FormLoginSupport isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      </div>
    </section>
  );
}