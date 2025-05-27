"use client";

import { createContext, useContext, useState } from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertContextType {
    showAlert: (type: string, title: string, msg: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert precisa ser usado dentro de AlertProvider");
    }
    return context;
};

export function AlertProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("Alerta");
    const [description, setDescription] = useState("");
    const [type, setType] = useState<"info" | "error" | "success" | "warning">("info");

    const showAlert = (type: string, title: string, msg: string) => {
        setType(type as any);
        setTitle(title);
        setDescription(msg);
        setIsOpen(true);
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent
                    className={
                        type === "error"
                            ? "border-red-500"
                            : type === "success"
                                ? "border-green-500"
                                : type === "warning"
                                    ? "border-yellow-500"
                                    : "border-blue-500"
                    }
                >
                    <AlertDialogHeader>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        <AlertDialogDescription>{description}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Fechar</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AlertContext.Provider>
    );
}