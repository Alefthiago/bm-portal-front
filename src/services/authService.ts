//      UTIL.      //
import UserModel from "@/models/userModel";
import AppResponse from "@/utils/appResponse";
import App from "next/app";
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
}