"use client";
//      UTIL.        //
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { useState, useEffect, use } from "react";
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Loader2, Send, Headset, XCircle } from "lucide-react";
import { set, z } from "zod";
import { signIn } from "next-auth/react";
import { useAlert } from "@/components/alert-provider";
//     /UTIL.        //

//      Valudação do form.       //
const formSchema = z.object({
    login: z.string().min(1, "Campo obrigatório"),
    password: z.string().min(1, "Campo obrigatório")
});
//     /Valudação do form.       //

export default function FormLoginSupport() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [alertForm, setAlertForm] = useState("");


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

    const handleLoginBlur = async (
        e: React.FocusEvent<HTMLInputElement>,
        originalOnBlur: (...event: any[]) => void
    ) => {
        originalOnBlur(e);
        const value: string = e.target.value.trim().toLowerCase();
        const nameInput: any = e.target.name;
        form.setValue(nameInput, value);
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            login: "",
            password: ""
        },
    });

    async function onSubmit() {
        setIsLoadingBtn(true);
        setAlertForm("");
        const data: FormData = new FormData();
        data.append("login", form.getValues("login"));
        data.append("password", form.getValues("password"));

        try {
            const response = await fetch("/api/auth/loginSup", {
                method: "POST",
                body: data,
            });

            if (!response.ok) {
                let contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    let errorData = await response.json();
                    console.error("Erro ao criar conta:", errorData);
                    if (errorData.issues) {
                        let issues = errorData.issues.map((issue: any) => issue.message).join("<br/>");
                        setAlertForm(issues);
                    } else {
                        setAlertForm(errorData.msg || "Houve um erro inesperado ao realizar login, tente novamente mais tarde ou entre em contato com o suporte");
                    }
                } else {
                    let errorText = await response.text();
                    console.error("Erro ao criar conta:", errorText);
                    setAlertForm("Houve um erro inesperado ao realizar login, tente novamente mais tarde ou entre em contato com o suporte");
                }
                setIsLoadingBtn(false);
                return;
            }
            const responseData = await response.json();
            console.log("Resposta da API:", responseData);
            setIsLoadingBtn(false);
        } catch (error) {
            setIsLoadingBtn(false);
            console.error("Erro ao criar conta:", error);
            setAlertForm("Houve um erro inesperado ao realizar login, tente novamente mais tarde ou entre em contato com o suporte");
        }
    }

    return (
        <div>
            <AlertDialog open={isOpenModal} onOpenChange={setIsOpenModal}>
                <AlertDialogContent className="max-w-md">
                    <AlertDialogCancel className="absolute top-2 right-2 bg-transparent border-none p-1 rounded-full hover:bg-muted transition-colors cursor-pointer">
                        <XCircle className="w-6 h-6" />
                    </AlertDialogCancel>

                    <AlertDialogHeader className="text-center">
                        <AlertDialogTitle className="text-xl font-bold">
                            Realize o Login
                        </AlertDialogTitle>
                    </AlertDialogHeader>

                    <div className="flex flex-col items-center">
                        {alertForm !== "" && (
                            <Alert variant="destructive">
                                <AlertCircleIcon />
                                <AlertTitle>{alertForm}</AlertTitle>
                            </Alert>
                        )}

                        <Card className="w-full border-none shadow-none bg-transparent">
                            <CardContent className="p-0">
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="flex flex-col gap-5 px-4 py-6"
                                    >
                                        <FormField
                                            control={form.control}
                                            name="login"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Login</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            autoComplete="off"
                                                            placeholder="Digite seu login"
                                                            {...field}
                                                            onBlur={(e) => handleLoginBlur(e, field.onBlur)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Senha</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            autoComplete="off"
                                                            placeholder="Digite sua senha"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={isLoadingBtn}
                                        >
                                            {isLoadingBtn ? (
                                                <Loader2 className="animate-spin" />
                                            ) : (
                                                <Send className="mr-2" />
                                            )}
                                            Entrar
                                        </Button>
                                        {/* <div className="text-center text-sm text-muted-foreground">
                                            Esqueceu a senha?
                                            <br />
                                            <Link
                                                href="https://wa.me/558131262050"
                                                target="_blank"
                                                className="underline underline-offset-4"
                                            >
                                                Clique aqui
                                            </Link>
                                        </div> */}
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};