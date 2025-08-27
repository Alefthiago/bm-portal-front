//      UTIL.        //
import { AlertCircleIcon } from "lucide-react";
import {
    Alert,
    AlertTitle,
} from "@/components/ui/alert";
import { useState } from "react";
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
    AlertDialogTitle,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Loader2, Send, XCircle } from "lucide-react";
import { z } from "zod";
import { signIn } from "next-auth/react";
//     /UTIL.        //

//      Valudação do form.       //
const formSchema = z.object({
    login: z.string().min(1, "Campo obrigatório"),
    password: z.string().min(1, "Campo obrigatório")
});
//     /Valudação do form.       //

//      INTERFACE.      //
interface FormLoginSupportProps{
    isOpenModal: boolean;
    setIsOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
};
//     /INTERFACE.      //
export default function FormLoginSupport({isOpenModal, setIsOpenModal}: FormLoginSupportProps) {
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [alertForm, setAlertForm] = useState("");
    const router = useRouter();

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
            const signInResponse = await signIn("credentials", {
                redirect: false,
                login: form.getValues("login"),
                password: form.getValues("password"),
            });

            if (signInResponse?.error) {
                console.error("Erro ao realizar login:", signInResponse.error);
                setAlertForm("Dados inválidos, verifique seu login e senha e tente novamente");
                setIsLoadingBtn(false);
                return false;
            }

            router.push("/");
        } catch (error) {
            setIsLoadingBtn(false);
            console.error("Erro ao criar conta:", error);
            setAlertForm("Houve um erro inesperado ao realizar login, tente novamente mais tarde ou entre em contato com o suporte");
            return false;
        }
    }

    return (
        <div>
            <AlertDialog open={isOpenModal} onOpenChange={setIsOpenModal}>
                <AlertDialogContent className="max-w-md">
                    <AlertDialogCancel
                        className="absolute top-2 right-2 bg-transparent border-none p-1 rounded-full hover:bg-muted transition-colors cursor-pointer"
                    >
                        <XCircle className="w-6 h-6" />
                    </AlertDialogCancel>

                    <AlertDialogHeader className="text-center">
                        <AlertDialogTitle className="text-xl font-bold">
                            Realize o Login
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Informe seu login e senha para acessar o sistema.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="flex flex-col items-center">
                        {alertForm && (
                            <Alert variant="destructive" className="w-full">
                                <AlertCircleIcon className="mr-2" />
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