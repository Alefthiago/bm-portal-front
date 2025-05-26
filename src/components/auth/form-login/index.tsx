"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
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
import { useTheme } from "next-themes";

//      Validações do form.     //
const formSchema = z.object({
    login: z.string().nonempty("Login é obrigatório"),
    password: z.string().nonempty("Senha é obrigatória"),
})
//     /Validações do form.     //

export function LoginForm() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            login: "",
            password: "",
        },
    })
    
    function onSubmit(values: z.infer<typeof formSchema>) {
        values.login = values.login.trim();
        values.password = values.password.trim();
        if (!values.login || !values.password) {
            form.setError("root", {
                type: "manual",
                message: "Preencha todos os campos obrigatórios.",
            });
            return;
        }
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="border p-5 rounded-lg shadow-md">
                {mounted ? (
                    <Image
                        src={`/logo${theme != "dark" ? "Azul" : "Branco"}.svg`}
                        alt="Logo"
                        width={100}
                        height={100}
                        className="mx-auto mb-4"
                    />
                ) : (
                    <Skeleton className={`mx-auto mb-4 h-[100px] w-[100px] rounded-full`} />
                )}

                <div className="mb-5">
                    <FormField
                        control={form.control}
                        name="login"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Login</FormLabel>
                                <FormControl>
                                    <Input placeholder="Login" {...field} />
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
                <div className={"flex flex-col justify-end mt-4"}>
                    <Button type="submit" className={`cursor-pointer`}>Entrar</Button>
                    <Button variant="link" className={`cursor-pointer`}>Criar Conta</Button>
                </div>
            </form>
        </Form>
    )
}
