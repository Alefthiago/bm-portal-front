"use client";
//      UTIL.        //
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
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
import Image from "next/image";
import { Facebook, Linkedin, Instagram, Loader2, Send } from "lucide-react";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useAlert } from "@/components/alert-provider";
//      UTIL.        //

//      Validações do form.     //
const formSchema = z.object({
    login: z.string().trim().nonempty("Login é obrigatório"),
    password: z.string().nonempty("Senha é obrigatória"),
})
//     /Validações do form.     //

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter();
    const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);
    const { showAlert } = useAlert();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            login: "",
            password: ""
        },
    })

    const handleLoginBlur = async (
        e: React.FocusEvent<HTMLInputElement>,
        originalOnBlur: (...event: any[]) => void
    ) => {
        originalOnBlur(e);
        const valorCampo = e.target.value.trim();
        form.setValue("login", valorCampo, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoadingBtn(true);
        values.login = values.login.trim().toLowerCase();

        try {
            const signInResponse = await signIn("credentials", {
                redirect: false,
                login: values.login,
                password: values.password,
            });

            if (signInResponse?.error) {
                console.error("Login não realizado:", signInResponse.error);
                showAlert("error", "Erro ao realizar autenticar", "Verifique suas credenciais e tente novamente.");
                setIsLoadingBtn(false);
                return;
            }

            router.push("/");
        } catch (error) {
            console.error("Erro ao realizar login:", error);
            showAlert("error", "Erro ao realizar autenticar", "Tenta realizar o login manualmente");
            setIsLoadingBtn(false);
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">Bm Portal</h1>
                                    <p className="text-muted-foreground text-balance">
                                        Bem-Vindo
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
                                                    <Input placeholder="Login" {...field} onBlur={(e) => handleLoginBlur(e, field.onBlur)} />
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
                                                    <Input type="password" placeholder="******" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                                <div className="flex items-center">
                                                    <a
                                                        href="#"
                                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                                    >
                                                        Esqueceu sua senha?
                                                    </a>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type="submit" className={`cursor-pointer`} disabled={isLoadingBtn}>
                                    {isLoadingBtn && <Loader2 className="animate-spin" />}
                                    {!isLoadingBtn && <Send />}
                                    Entrar
                                </Button>
                                <div className="text-center text-sm">
                                    Não tem uma conta?{" "}
                                    <Link href="/register" className="underline underline-offset-4">
                                        Cadastre-se
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className="bg-[#F8F8F8] relative hidden md:block">
                        <Image
                            src="/bm.svg"
                            alt="Logo"
                            width={100}
                            height={100}
                            className="absolute inset-0 h-full w-full p-5"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
};