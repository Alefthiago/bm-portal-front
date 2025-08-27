"use client";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

//      UTIL.       //
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
//     /UTIL.       //

//      Valudação do form.       //
const formSchema = z.object({
    title: z.string().min(1, "Campo obrigatório"),
    level: z.string().min(1, "Campo obrigatório").max(1, "Valor invalido"),
});
//     /Valudação do form.       //


export default function FormMenu() {
    const [alertForm, setAlertForm] = useState("");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            level: ""
        }
    });

    const handleLoginBlur = async (
        e: React.FocusEvent<HTMLInputElement>,
        originalOnBlur: (...event: any[]) => void
    ) => {
        originalOnBlur(e);
        const value: string = e.target.value.trim().toLowerCase();
        const nameInput: any = e.target.name;
        form.setValue(nameInput, value);
    }

    return (
        <div className={cn("flex flex-col gap-6")}>
            <div className="flex flex-col items-center">
                {alertForm && (
                    <Alert variant="destructive" className="w-full">
                        <AlertCircleIcon className="mr-2" />
                        <AlertTitle>{alertForm}</AlertTitle>
                    </Alert>
                )}

                <Card className={`w-full border-none shadow-none bg-transparent`}>
                    <CardContent className="p-0">
                        <Form {...form}>
                            <form
                                // onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col gap-5 px-4 py-6"
                            >

                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Titulo</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder=""
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
                                    name="level" // nome do campo no form
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nível</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                    }}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Selecione o nível" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Níveis</SelectLabel>
                                                            <SelectItem value="1">1</SelectItem>
                                                            <SelectItem value="2">2</SelectItem>
                                                            <SelectItem value="3">3</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}