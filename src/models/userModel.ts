//      UTIL.       //
import { prisma } from "@/lib/prisma";
import AppResponse from "@/utils/appResponse";
import { encrypt } from "@/utils/crypto";
//     /UTIL.       //

export default class UserModel {
    static async create(data: Record<string, string>): Promise<AppResponse> {
        try {
            const passwordHashed = encrypt(data.password);
            const user = await prisma.user.create({
                data: {
                    login: data.login.trim().toLowerCase() as string,
                    name: data.name.trim().toLowerCase() as string,
                    email: data.email.trim().toLowerCase() as string,
                    phone: data.phone.replace(/\D/g, "") as string,
                    password: passwordHashed.encryptedData as string,
                    iv: passwordHashed.iv as string
                }
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

    static async getUserByLogin(login: string): Promise<AppResponse> {
        try {
            const user = await prisma.user.findFirst({
                where: { login }
            });

            if (!user) {
                return AppResponse.error(
                    "Usuário não encontrado",
                    "UserModel/getUserByLogin: Usuário não existe"
                );
            }

            return AppResponse.success("Usuário encontrado", user);
        } catch (error) {
            return AppResponse.error(
                "Erro ao buscar usuário",
                `UserModel/getUserByLogin: ${error instanceof Error ? error.message : "Erro desconhecido"}`
            );
        }
    }
}