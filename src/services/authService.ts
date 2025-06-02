//      UTIL.      //
import UserModel from "@/models/userModel";
import AppResponse from "@/utils/appResponse";
//     /UTIL.      //

export default class AuthService {
    static async createUser(data: FormData): Promise<AppResponse> {
        try {
            const email = data.get("email") as string;
            const login = data.get("login") as string;

            //      VALIDAÇÕES BAsICAS.      //
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
            //     /VALIDAÇÕES BAsICAS.      //

            const userCreated: AppResponse = await UserModel.create(data);
            if(!userCreated.status) {
                return AppResponse.error(
                    userCreated.msg,
                    `AuthService/createUser: ${userCreated.error}`
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

    // static async generateJwt(userId: string, ): Promise<AppResponse> {
    // }
}