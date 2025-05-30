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
                return AppResponse.error("Email já está em uso", "Email duplicado");
            }

            const loginExists = await UserModel.verifyLoginExist(login);
            if (!loginExists.status) return loginExists;
            if (loginExists.data) {
                return AppResponse.error("Login já está em uso", "Login duplicado");
            }
            //     /VALIDAÇÕES BAsICAS.      //

            const userCreated: AppResponse = await UserModel.create(data);

            return AppResponse.success("Usuário criado");
        } catch (error) {
            return AppResponse.error(
                "Erro ao criar usuário",
                `AuthService/createUser: ${error instanceof Error ? error.message : "Erro desconhecido"}`
            );
        }
    }
}