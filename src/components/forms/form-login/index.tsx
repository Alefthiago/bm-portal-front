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
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { Loader2, Send } from "lucide-react";
import { set, z } from "zod";
import { signIn } from "next-auth/react";
import { useAlert } from "@/components/alert-provider";
//      UTIL.        //

//      Validações do form.     //
const formSchema = z.object({
    phone: z.string().trim().nonempty("Número é obrigatório")
        .min(14, "Número inválido")
        .max(15, "Número inválido"),
    cnpj: z.string().trim().nonempty("Documento é obrigatório").refine((value) => {
        const raw = value.replace(/\D/g, "");
        if (raw.length === 11) return isValidCPF(raw);
        if (raw.length === 14) return isValidCNPJ(raw);
        return false;
    }, {
        message: "Documento inválido",
    }),
})
//     /Validações do form.     //


//      FUNÇÕES DE VALIDAÇÃO DE DOCUMENTOS     //
function isValidCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    let check1 = (sum * 10) % 11;
    if (check1 === 10 || check1 === 11) check1 = 0;
    if (check1 !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    let check2 = (sum * 10) % 11;
    if (check2 === 10 || check2 === 11) check2 = 0;
    return check2 === parseInt(cpf.charAt(10));
}

function isValidCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/\D/g, "");
    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    let digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;

    for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    length += 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;

    for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === parseInt(digits.charAt(1));
}
//     /FUNÇÕES DE VALIDAÇÃO DE DOCUMENTOS     //

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter();
    const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);
    const { showAlert } = useAlert();

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpIsLoading, setOtpIsLoading] = useState(false);
    const [otpError, setOtpError] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: "",
            cnpj: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoadingBtn(true);
            const formData: FormData = new FormData();
            formData.append("phone", values.phone.replace(/\D/g, ""));
            formData.append("cnpj", values.cnpj.replace(/\D/g, ""));

            const response = await fetch("/api/auth/login", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                let contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    let errorData = await response.json();
                    console.error("Erro ao criar conta:", errorData);
                    if (errorData.issues) {
                        let issues = errorData.issues.map((issue: any) => issue.message).join("<br/>");
                        console.error("Problemas encontrados:", issues);
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

            const data = await response.json();
            setIsLoadingBtn(false);
            setIsOpenModal(true);
            // const signInResponse = await signIn("credentials", {
            //     redirect: false,
            //     phone: values.phone,
            // });

            // if (signInResponse?.error) {
            //     console.error("Login não realizado:", signInResponse.error);
            //     showAlert("error", "Erro ao realizar autenticar", "Verifique suas credenciais e tente novamente.");
            //     setIsLoadingBtn(false);
            //     return;
            // }

            // router.push("/");
        } catch (error) {
            console.error("Erro ao realizar login:", error);
            showAlert("error", "Erro ao realizar autenticar", "Tenta realizar o login manualmente");
            setIsLoadingBtn(false);
        }
    }

    async function handleOtpSubmit() {
        setOtpIsLoading(true);
        setOtpError("");
        
        try {
            let otpValue = otp.replace(/\D/g, "");
            let otpLength = otpValue.length;
            if (otpLength < 6) {
                setOtpError("Por favor, insira um código de 6 dígitos.");
                setOtpIsLoading(false);
                return;
            }

            let documento: string = form.getValues("cnpj");
            let phone: string = form.getValues("phone");

            const response = await fetch("/api/auth/login?phone=" + phone.replace(/\D/g, "") + "&document=" + documento.replace(/\D/g, "") + "&otp=" + otpValue, {
                method: "GET"
            });

            if (!response.ok) {
                let contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    let errorData = await response.json();
                    console.error("Erro ao criar conta:", errorData);
                    if (errorData.issues) {
                        let issues = errorData.issues.map((issue: any) => issue.message).join("<br/>");
                        setOtpError(issues);
                    } else {
                        setOtpError(errorData.msg);
                    }
                } else {
                    let errorText = await response.text();
                    console.error("Erro ao criar conta:", errorText);
                    setOtpError("Tente novamente mais tarde ou entre em contato com o suporte");
                }
                setOtpIsLoading(false);
                return;
            }

            const data = await response.json();
            // const signInResponse = await signIn("credentials", {
            //     redirect: false,
            //     phone: values.phone,
            // });

            // if (signInResponse?.error) {
            //     console.error("Login não realizado:", signInResponse.error);
            //     showAlert("error", "Erro ao realizar autenticar", "Verifique suas credenciais e tente novamente.");
            //     setIsLoadingBtn(false);
            //     return;
            // }

            // router.push("/");
            setOtpIsLoading(false);
            // setIsOpenModal(false);
            // router.push("/");
        } catch (error) {
            console.error("Erro ao enviar OTP:", error);
            setOtpError("Erro ao enviar o código. Tente novamente.");
            setOtpIsLoading(false);
        }
    }

    const handleChange = (value: string) => {
        setOtp(value);
        console.log("OTP atual:", value);
    };


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
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    WhatsApp</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        maxLength={15}
                                                        autoComplete="off"
                                                        placeholder="(00) 0 0000-0000"
                                                        {...field}
                                                        onChange={(e) => {
                                                            let raw = e.target.value.replace(/\D/g, "");
                                                            let formatted = raw;

                                                            if (raw.length === 10) {
                                                                formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6)}`;
                                                            } else if (raw.length === 11) {
                                                                formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
                                                            }

                                                            field.onChange(formatted);
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="cnpj"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Documento</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="CNPJ/CFP da Empresa"
                                                        maxLength={18}
                                                        autoComplete="off"
                                                        {...field}
                                                        onChange={(e) => {
                                                            let raw = e.target.value.replace(/\D/g, "");
                                                            let formatted = raw;

                                                            if (raw.length === 11) {
                                                                formatted = raw.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
                                                            } else if (raw.length === 14) {
                                                                formatted = raw.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
                                                            }

                                                            field.onChange(formatted);
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
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
                                    Não consegue entrar?<br />
                                    <Link href="https://wa.me/558131262050" target="_blank" className="underline underline-offset-4">
                                        Entre em contato o suporte
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className="bg-[#F8F8F8] relative hidden md:block">
                        <Image
                            priority
                            src="/bm.svg"
                            alt="Logo"
                            width={100}
                            height={100}
                            className="absolute inset-0 h-full w-full p-5"
                        />
                    </div>
                </CardContent>
            </Card>

            <AlertDialog open={isOpenModal} onOpenChange={setIsOpenModal}>
                <AlertDialogContent>
                    <AlertDialogHeader className="flex justify-center items-center">
                        <AlertDialogTitle>
                            Insira o código de verificação
                        </AlertDialogTitle>

                        <AlertDialogDescription className="flex flex-col items-center text-center">
                            Um código será enviado para o seu WhatsApp. Por favor, insira o código abaixo para continuar
                            <br />
                            CÓDIGO VÁLIDO POR 10 MINUTOS
                        </AlertDialogDescription>

                        <div className="flex flex-col items-center text-center gap-2 ">
                            <p className="text-md text-red-500">
                                {otpError && otpError}
                            </p>
                            <InputOTP maxLength={6} value={otp} onChange={handleChange}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer" disabled={otpIsLoading}>Cancelar</AlertDialogCancel>
                        <Button className="cursor-pointer" onClick={handleOtpSubmit} disabled={otpIsLoading}>
                            {otpIsLoading && <Loader2 className="animate-spin" />}
                            Confirmar
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
};