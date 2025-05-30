//      UTIL.       //
import { prisma } from "@/lib/prisma";
import AppResponse from "@/utils/appResponse";
import { encrypt } from "@/utils/crypto";
//     /UTIL.       //

export default class UserModel {
    static async create(data: FormData): Promise<AppResponse> {
        try {
            let passwordHashed = encrypt(data.get("password") as string);
            const user = await prisma.user.create({
                data: {
                    login: (data.get("login") as string).trim().toLowerCase(),
                    name: (data.get("name") as string).trim().toLowerCase(),
                    email: (data.get("email") as string).trim().toLowerCase(),
                    password: passwordHashed.encryptedData
                },
            });

            return AppResponse.success("Usuário criado com sucesso", user);
        } catch (error) {
            return AppResponse.error(
                "Erro ao criar usuário",
                `UserModel/create: ${error instanceof Error ? error.message : "Erro desconhecido"}`
            );
        }
    }

    static async verifyLoginExist(login: string): Promise<AppResponse> {
        try {
            const user = await prisma.user.findFirst({
                select: { id: true },
                where: { login }
            });

            return AppResponse.success("Login verificado com sucesso", !!user);
        } catch (error) {
            return AppResponse.error(
                "Erro ao verificar login",
                `UserModel/verifyLoginExist: ${error instanceof Error ? error.message : "Erro desconhecido"}`
            );
        }
    }

    static async verifyEmailExist(email: string): Promise<AppResponse> {
        try {
            const user = await prisma.user.findFirst({
                select: { id: true },
                where: { email }
            });

            return AppResponse.success("Email verificado com sucesso", !!user);
        } catch (error) {
            return AppResponse.error(
                "Erro ao verificar email",
                `UserModel/verifyEmailExist: ${error instanceof Error ? error.message : "Erro desconhecido"}`
            );
        }
    }
}