"use client"

import { Button } from "@/components/ui/button"
import { CopyIcon } from "lucide-react"
import { toast } from "sonner"

export function CopyButton({ textToCopy }: { textToCopy: string }) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copiado com sucesso!")
    }).catch(() => {
      toast.error("Não foi possível copiar, provavelmente o navegador não tem suporte")
    })
  }

  return (
    <Button
      onClick={() => handleCopy(textToCopy)}
      size="icon"
      variant="ghost"
      className="h-7 w-7 cursor-pointer"
      title="Copiar"
    >
      <CopyIcon className="w-3 h-3" />
    </Button>
  )
}