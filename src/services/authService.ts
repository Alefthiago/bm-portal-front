//      UTIL.      //
import { verifyUserExist } from "@/models/userModel";
//     /UTIL.      //
export async function createUser(data: FormData) {
    try {
        const teste = await verifyUserExist(data.get("email") as string, data.get("login") as string);

        if (teste.status) {
            return {
                msg: "Usuário já existe",
                error: "AuthService/createUser: Usuário já cadastrado"
            };
        } else {
            return {
                msg: "Usuário não encontrado, prosseguindo com a criação",
                error: null
            }
        }
    } catch (error) {
        return {
            msg: "Erro inesperado, tente novamente mais tarde ou entre em contato com o suporte",
            error: `AuthService/createUser: ${error instanceof Error ? error.message : "Error desconhecido"}`
        };
    }
}