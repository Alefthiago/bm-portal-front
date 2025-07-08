//      UTIL.       //
import { z } from "zod";
import { isValidCPF, isValidCNPJ } from "@/utils/functions";
//     /UTIL.       //

//      VALIDAÇÃO DE DADOS DO USUÁRIO PARA REGISTRO.        //
export const LoginUserDTO = z.object({
    phone: z.string({
        required_error: "WhatsApp é obrigatório"
    }).trim().nonempty("Número é obrigatório")
        .min(10, "Número inválido")
        .max(11, "Número inválido"),
    cnpj: z.string({
        required_error: "Documento é obrigatório"
    }).trim().nonempty("Documento é obrigatório").refine((value) => {
        const raw = value.replace(/\D/g, "");
        if (raw.length === 11) return isValidCPF(raw);
        if (raw.length === 14) return isValidCNPJ(raw);
        return false;
    }, {
        message: "Documento inválido",
    }),
});
export type LoginUserDTOType = z.infer<typeof LoginUserDTO>;
//     /VALIDAÇÃO DE DADOS DO USUÁRIO PARA REGISTRO.        //

//      VALIDAÇÃO DE DADOS DE LOGIN SUPORTE.        //
export const LoginSupportDTO = z.object({
    login: z.string({
        required_error: "Login é obrigatório"
    }).trim().nonempty("Login é obrigatório"),
    password: z.string({
        required_error: "Senha é obrigatória"
    }).trim().nonempty("Senha é obrigatória"),
});
//     /VALIDAÇÃO DE DADOS DE LOGIN SUPORTE.        //
