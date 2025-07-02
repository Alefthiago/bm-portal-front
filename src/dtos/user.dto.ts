//      UTIL.       //
import { z } from "zod";
//     /UTIL.       //

//      VALIDAÇÃO DE DADOS DO USUÁRIO PARA REGISTRO.        //
export const RegisterUserDTO = z.object({
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
        .min(14, "WhatsApp deve conter pelo menos 10 números")
});
export type RegisterUserDTOType = z.infer<typeof RegisterUserDTO>;
//     /VALIDAÇÃO DE DADOS DO USUÁRIO PARA REGISTRO.        //