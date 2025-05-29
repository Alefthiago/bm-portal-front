"use client"
//      UTIL.       //
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
//     /UTIL.       //

//      COMPONENTS.     //
import { useAlert } from "@/components/alert-provider";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link";
//     /COMPONENTS.     //

//      Validações do form.     //
const formSchema = z.object({
    login: z.string().trim().nonempty("Login é obrigatório"),
    password: z.string().nonempty("Senha é obrigatória"),
})
//     /Validações do form.     //

export function LoginForm() {
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
        values.login = values.login.trim().toLowerCase();

        const formData: FormData = new FormData();

        formData.append("login", values.login);
        formData.append("password", values.password); 

        try {
            const response: Response = await fetch(`/api/auth`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const contentType = response.headers.get("Content-Type");
                if (contentType && contentType.includes("application/json")) {
                    const erro = await response.json();
                    console.error("Erro :", erro);
                    showAlert("error", "Erro ao fazer login", erro.msg || "Ocorreu um erro ao tentar fazer login, por favor, tente novamente mais tarde ou entre em contato com o suporte");
                } else {
                    const erro = await response.text();
                    console.error("Erro :", erro);
                    showAlert("error", "Erro ao fazer login", "Ocorreu um erro ao tentar fazer login, por favor, tente novamente mais tarde ou entre em contato com o suporte");
                }

                return false;
            }


        } catch (error) {

        }
    }

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
                <div className={"flex flex-col mt-4 text-center"}>
                    <Button type="submit" className={`cursor-pointer`}>Entrar</Button>

                    <Link href="/register">
                        <Button variant="link" type="button" className={`cursor-pointer`}>Criar Conta</Button>
                    </Link>
                </div>
            </form>
        </Form>
    )
}