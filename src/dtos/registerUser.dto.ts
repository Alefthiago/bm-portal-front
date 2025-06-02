//      UTIL.       //
import { z } from "zod";
//     /UTIL.       //

export const RegisterUserDTO = z.object({
    login: z.string().trim().min(5).nonempty("Login é obrigatório"),
    name: z.string().trim().min(5).nonempty("Nome completo é obrigatório"),
    email: z.string().trim().email("E-mail inválido").nonempty("E-mail é obrigatório"),
    passwordConfirm: z.string().min(6).nonempty("Confirmação de senha é obrigatória"),
    password: z.string().min(5).nonempty("Senha é obrigatória")
});

export type RegisterUserDTOType = z.infer<typeof RegisterUserDTO>;