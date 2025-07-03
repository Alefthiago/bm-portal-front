//      UTIL.      //
import UserModel from "@/models/userModel";
import AppResponse from "@/utils/appResponse";
//     /UTIL.      //

export default class AuthService {
    static async createUser(data: Record<string, string>): Promise<AppResponse> {
        try {
            const email: string = data.email.trim().toLowerCase();
            const login: string = data.login.trim().toLowerCase();

            //      VALIDAÇÕES BASICAS.      //
            const emailExists: AppResponse = await UserModel.verifyEmailExist(email);
            if (!emailExists.status) return emailExists;
            if (emailExists.data) {
                return AppResponse.error("E-mail inválido", "Email duplicado");
            }

            const loginExists = await UserModel.verifyLoginExist(login);
            if (!loginExists.status) return loginExists;
            if (loginExists.data) {
                return AppResponse.error("Login inválido", "Login duplicado");
            }
            //     /VALIDAÇÕES BASICAS.      //

            const userCreated: AppResponse = await UserModel.create(data);
            if (!userCreated.status) {
                return AppResponse.error(
                    userCreated.msg,
                    userCreated.error as string
                );
            }

            return AppResponse.success("Usuário criado", userCreated.data);
        } catch (error) {
            return AppResponse.error(
                "Erro ao criar usuário",
                `AuthService/createUser: ${error instanceof Error ? error.message : "Erro desconhecido"}`
            );
        }
    }

    static async confirmPhone(phone: string): Promise<AppResponse> {
        try {
            //      Validação do número de telefone.      //
            if (!phone || typeof phone !== 'string' || !/^\d{10,15}$/.test(phone)) {
                return AppResponse.error("Número de telefone inválido", "Número de telefone não corresponde ao formato esperado");
            }
            //     /Validação do número de telefone.      //

            const genetedTokenConfirmPhone: string = Math.floor(Math.random() * 0x10000).toString(16).padStart(4, '0');
            return AppResponse.success("Token gerado com sucesso", { tokenConfirmPhone: genetedTokenConfirmPhone });
        } catch (error) {
            return AppResponse.error(
                "Erro ao gerar token de confirmação de telefone",
                `AuthService/confirmPhone: ${error instanceof Error ? error.message : "Erro desconhecido"}`
            );
        }
    }
}