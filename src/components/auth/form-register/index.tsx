"use client"
//      UTIL.       //
import { useAlert } from "@/components/alert-provider";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
//     /UTIL.       //

//      COMPONENTS.     //
import { Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
//     /COMPONENTS.     //

//      Validações do form.     //
const formSchema = z.object({
    login: z.string().trim().nonempty("Login é obrigatório"),
    name: z.string().trim().nonempty("Nome completo é obrigatório"),
    email: z.string().trim().email("E-mail inválido").nonempty("E-mail é obrigatório"),
    passwordConfirm: z.string().nonempty("Confirmação de senha é obrigatória"),
    password: z.string().nonempty("Senha é obrigatória")
})
//     /Validações do form.     //

export function RegisterForm() {
    const { showAlert } = useAlert();
    const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            login: "",
            name: "",
            email: "",
            passwordConfirm: "",
            password: "",
        },
    })

    //      EVENTOS.     //
    const handleLoginBlur = async (
        e: React.FocusEvent<HTMLInputElement>,
        originalOnBlur: (...event: any[]) => void
    ) => {
        originalOnBlur(e);
        const value: string = e.target.value.trim();
        const nameInput: any = e.target.name;
        if (nameInput !== "password" && nameInput !== "passwordConfirm") {
            form.setValue(nameInput, value, {
                shouldValidate: true,
                shouldDirty: true,
            });
        }
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoadingBtn(true);
        values.login = values.login.trim().toLowerCase();
        values.name = values.name.trim().toLowerCase();
        values.email = values.email.trim().toLowerCase();

        if (values.password !== values.passwordConfirm) {
            showAlert("error", "Erro de validação", "As senhas precisam ser iguais");
            setIsLoadingBtn(false);
            return;
        }

        const formData: FormData = new FormData();
        formData.append("login", values.login);
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("passwordConfirm", values.passwordConfirm);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json();
                    console.error("Erro ao criar conta:", errorData.error);
                    showAlert("error", "Erro de validação", errorData.msg);
                } else {
                    const errorText = await response.text();
                    console.error("Erro ao criar conta:", errorText);
                    showAlert("error", "Erro inesperado", "Tente novamente mais tarde ou entre em contato com o suporte");
                }
                return;
            }

            const data = await response.json();
            localStorage.setItem("bmPortalJwt", data.token);
            redirect("/");
        } catch (error) {
            showAlert("error", "Erro inesperado", "Tente novamente mais tarde ou entre em contato com o suporte");
            console.error("Erro ao enviar o formulário:", error);
        } finally {
            setIsLoadingBtn(false);
        }
    }
    //     /EVENTOS.     //

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="border p-5 rounded-lg shadow-md">
                <Image
                    priority
                    src={`/logo.ico`}
                    alt="Logo"
                    width={100}
                    height={100}
                    className="mx-auto mb-4"
                />

                <div className="mb-5">
                    <FormField
                        control={form.control}
                        name="login"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Login</FormLabel>
                                <FormControl>
                                    <Input placeholder="Login" {...field} onBlur={(e) => handleLoginBlur(e, field.onBlur)} />
                                </FormControl>
                                <FormDescription>
                                    Obrigatório
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="mb-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome Completo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nome Completo" {...field} onBlur={(e) => handleLoginBlur(e, field.onBlur)} />
                                </FormControl>
                                <FormDescription>
                                    Obrigatório
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="mb-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder="E-mail" {...field} onBlur={(e) => handleLoginBlur(e, field.onBlur)} />
                                </FormControl>
                                <FormDescription>
                                    Obrigatório
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>


                <div className="mb-5">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="******" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Obrigatório
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="mb-5">
                    <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirmar Senha</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="******" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Obrigatório
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className={"flex flex-col mt-4 text-center"}>
                    <Button type="submit" className={`cursor-pointer`} disabled={isLoadingBtn}>
                        {isLoadingBtn && <Loader2 className="animate-spin" />}
                        {!isLoadingBtn && <Send />}
                        Criar Conta
                    </Button>

                    <Link href="/login">
                        <Button variant="link" type="button" className={`cursor-pointer`}>Relizar login</Button>
                    </Link>
                </div>
            </form>
        </Form>
    )
}