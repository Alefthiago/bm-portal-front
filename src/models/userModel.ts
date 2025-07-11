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

    static async getUserForLogin(login: string): Promise<AppResponse> {
        try {
            const user = await prisma.user.findFirst({
                select: {
                    id: true,
                    login: true,
                    name: true,
                    uf: true,
                    phone: true,
                    password: true,
                    iv: true,
                    role: {
                        select: {
                            name: true,
                            permissions: {
                                select: {
                                    permission: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                where: { login }
            });

            if (!user) {
                return AppResponse.error(
                    "Usuário não encontrado",
                    "UserModel/getUserForLogin: Usuário não existe"
                );
            }

            const userSession = {
                login: user.login,
                name: user.name,
                uf: user.uf,
                phone: user.phone,
                iv: user.iv,
                password: user.password,
                accessLevel: user.role ? {
                    name: user.role.name,
                    permissions: user.role.permissions.map((p) => (
                        p.permission.name
                    ))
                } : null
            };

            return AppResponse.success("Usuário encontrado", userSession);
        } catch (error) {
            return AppResponse.error(
                "Erro ao buscar usuário",
                `UserModel/getUserForLogin: ${error instanceof Error ? error.message : "Erro desconhecido"}`
            );
        }
    }
}