"use client";
//      UTIL.        //
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import Image from "next/image"
import {
    Loader2,
    Send,
    XCircle,
    CheckCircle,
    CirclePlus
} from "lucide-react";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useAlert } from "@/components/alert-provider";
//      UTIL.        //


//      Validações do form.     //
const formSchema = z.object({
    login: z.string({
        required_error: "Login é obrigatório"
    })
        .trim()
        .nonempty("Login é obrigatório")
        .min(5, "Login Deve conter pelo menos 5 caracteres"),
    name: z.string({
        required_error: "Nome é obrigatório"
    })
        .trim()
        .nonempty("Nome completo é obrigatório")
        .min(5, "Nome deve conter pelo menos 5 caracteres"),
    email: z.string({
        required_error: "E-mail é obrigatório"
    })
        .trim()
        .nonempty("E-mail é obrigatório")
        .email("E-mail inválido"),
    password: z.string({
        required_error: "Senha é obrigatório"
    })
        .nonempty("Senha é obrigatória")
        .min(6, "Senha deve conter pelo menos 6 caracteres"),
    phone: z.string({
        required_error: "WhatsApp é obrigatório"
    })
        .trim()
        .nonempty("WhatsApp é obrigatório")
        .min(13, "WhatsApp deve conter pelo menos 10 números")
});
//     /Validações do form.     //

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter();
    const { showAlert } = useAlert();
    const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);

    const [isLoadingBtnPhone, setIsLoadingBtnPhone] = useState<boolean>(false);
    const [phoneIsValid, setPhoneIsValid] = useState<boolean>(false);
    const [numberConfirmed, setNumberConfirmed] = useState<string>("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            login: "",
            name: "",
            email: "",
            phone: "",
            password: "",
        },
    });


    //      EVENTOS.     //
    const handlePhoneValidation = async () => {
        setIsLoadingBtnPhone(true);
        let phone: string = form.getValues("phone").replace(/\D/g, "");

        if (phone.length < 10) {
            showAlert("error", "Número de telefone inválido", "O número de telefone deve conter pelo menos 10 números");
            setIsLoadingBtnPhone(false);
            return;
        }

        if (phone === numberConfirmed) {
            showAlert("info", "Número já confirmado", "O número de telefone já foi confirmado");
            setIsLoadingBtnPhone(false);
            return;
        }

        try {
            const params = new URLSearchParams({ phone });
            let response = await fetch(`/api/auth/confirmPhone?${params.toString()}`, {
                method: "GET"
            });

            if (!response.ok) {
                let contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    let errorData = await response.json();
                    console.error("Erro ao criar conta:", errorData.error);
                    if (errorData.issues) {
                        let issues = errorData.issues.map((issue: any) => issue.message).join("<br/>");
                        showAlert("error", "Não foi possível concluir a ação", issues);
                    } else {
                        showAlert("error", "Não foi possível concluir a ação", errorData.msg);
                    }
                } else {
                    let errorText = await response.text();
                    console.error("Erro ao criar conta:", errorText);
                    showAlert("error", "Erro inesperado", "Tente novamente mais tarde ou entre em contato com o suporte");
                }
                setIsLoadingBtn(false);
                return;
            }

            let data = await response.json();
            setNumberConfirmed(phone);
            setPhoneIsValid(true);
            setIsLoadingBtnPhone(false);
        } catch (error) {
            console.error("Erro ao enviar o formulário:", error);
            showAlert("error", "Erro inesperado", "Tente novamente mais tarde ou entre em contato com o suporte");
            setIsLoadingBtnPhone(false);
        }
    };

    const handleLoginBlur = async (
        e: React.FocusEvent<HTMLInputElement>,
        originalOnBlur: (...event: any[]) => void
    ) => {
        originalOnBlur(e);
        const value: string = e.target.value.trim();
        const nameInput: any = e.target.name;
        form.setValue(nameInput, value, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoadingBtn(true);

        if (!phoneIsValid || !numberConfirmed || values.phone.replace(/\D/g, "") !== numberConfirmed) {
            showAlert("error", "Número de telefone inválido", "Por favor, valide o número de telefone antes de prosseguir");
            setIsLoadingBtn(false);
            return;
        }

        values.login = values.login.toLowerCase();
        values.name = values.name.toLowerCase();
        values.email = values.email.toLowerCase();

        let formData: FormData = new FormData();
        formData.append("login", values.login);
        formData.append("name", values.name);
        formData.append("phone", values.phone);
        formData.append("email", values.email);
        formData.append("password", values.password);

        try {
            let response = await fetch("/api/auth/register", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                let contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    let errorData = await response.json();
                    console.error("Erro ao criar conta:", errorData.error);
                    if (errorData.issues) {
                        let issues = errorData.issues.map((issue: any) => issue.message).join("<br/>");
                        showAlert("error", "Não foi possível concluir a ação", issues);
                    } else {
                        showAlert("error", "Não foi possível concluir a ação", errorData.msg);
                    }
                } else {
                    let errorText = await response.text();
                    console.error("Erro ao criar conta:", errorText);
                    showAlert("error", "Erro inesperado", "Tente novamente mais tarde ou entre em contato com o suporte");
                }
                setIsLoadingBtn(false);
                return;
            }

            let data = await response.json();

            try {
                const signInResponse = await signIn("credentials", {
                    redirect: false,
                    redirectTo: "/",
                    login: values.login,
                    password: values.password,
                });
                router.push("/");
            } catch (error) {
                console.error("Erro ao realizar login:", error);
                showAlert("error", "Erro ao realizar autenticar", "Tenta realizar o login manualmente");
                setIsLoadingBtn(false);
            }
        } catch (error) {
            console.error("Erro ao enviar o formulário:", error);
            showAlert("error", "Erro inesperado", "Tente novamente mais tarde ou entre em contato com o suporte");
            setIsLoadingBtn(false);
        }
    }
    //     /EVENTOS.     //

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="bg-[#F8F8F8] relative hidden md:block">
                        <Image
                            src="/bm.svg"
                            alt="Logo"
                            width={100}
                            height={100}
                            className="absolute inset-0 h-full w-full p-5"
                        />
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">Bm Portal</h1>
                                    <p className="text-muted-foreground text-balance">
                                        Crie sua conta para acessar o portal
                                    </p>
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="login"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Login</FormLabel>
                                                <FormControl>
                                                    <Input autoComplete="off" placeholder="Login" {...field} onBlur={(e) => handleLoginBlur(e, field.onBlur)} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nome</FormLabel>
                                                <FormControl>
                                                    <Input autoComplete="off" placeholder="Nome" {...field} onBlur={(e) => handleLoginBlur(e, field.onBlur)} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>WhatsApp</FormLabel>
                                                <div className="flex items-center gap-2 md:flex-row flex-col">
                                                    <FormControl className="md:w-4/5">
                                                        <Input
                                                            maxLength={14}
                                                            autoComplete="off" placeholder="(00) 0000-0000"
                                                            {...field}
                                                            onBlur={(e) => handleLoginBlur(e, field.onBlur)}
                                                            onChange={(e) => {
                                                                let raw = e.target.value.replace(/\D/g, "");
                                                                let formatted = raw;

                                                                if (raw.length === 10) {
                                                                    formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6)}`;
                                                                }

                                                                formatted.replace(/\D/g, "") !== numberConfirmed ? setPhoneIsValid(false) : setPhoneIsValid(true);
                                                                field.onChange(formatted);
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <Button
                                                        type="button"
                                                        className="w-full md:w-auto cursor-pointer"
                                                        disabled={isLoadingBtnPhone}
                                                        onClick={handlePhoneValidation}
                                                    >
                                                        {isLoadingBtnPhone ? (
                                                            <Loader2 className="animate-spin" />
                                                        ) : (
                                                            phoneIsValid ? (
                                                                <CheckCircle />
                                                            ) : (
                                                                <CirclePlus />
                                                            )
                                                        )}
                                                        Validar
                                                    </Button>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>E-mail</FormLabel>
                                                <FormControl>
                                                    <Input autoComplete="off" placeholder="Email" {...field} onBlur={(e) => handleLoginBlur(e, field.onBlur)} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Senha</FormLabel>
                                                <FormControl>
                                                    <Input type="password" autoComplete="off" placeholder="******" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type="submit" className={`cursor-pointer`} disabled={isLoadingBtn}>
                                    {isLoadingBtn && <Loader2 className="animate-spin" />}
                                    {!isLoadingBtn && <Send />}
                                    Criar Conta
                                </Button>
                                <div className="text-center text-sm">
                                    Já tem uma conta?{" "}
                                    <Link href="/login" className="underline underline-offset-4">
                                        Faça o login
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
};