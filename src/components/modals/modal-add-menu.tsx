
//      COMPONENTES.        //
import { PlusIcon, XCircle } from "lucide-react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import FormMenu from "@/components/forms/form-add-menu";
//     /COMPONENTES.        //

export function ModalAddMenu() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    title="Adicionar novo menu"
                    className="cursor-pointer w-fit"
                >
                    <PlusIcon className="w-4 h-4" />
                    Adicionar
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogCancel
                    className="absolute top-2 right-2 bg-transparent border-none p-1 rounded-full hover:bg-muted transition-colors cursor-pointer"
                >
                    <XCircle className="w-6 h-6" />
                </AlertDialogCancel>

                <AlertDialogHeader>
                    <AlertDialogTitle>Adicionar Menu</AlertDialogTitle>
                </AlertDialogHeader>

                <FormMenu />
            </AlertDialogContent>
        </AlertDialog>
    )
}
