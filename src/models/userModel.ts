//      UTIL.       //
import { PrismaClient  } from "@/generated/prisma";
import { error } from "console";
//     /UTIL.       //

export async function verifyUserExist(email: string, login: string) {
    try {
        const prisma = new PrismaClient();
        const user = await prisma.user.findFirst({
            select: { id: true },
            where: {
                OR: [
                    { email },
                    { login }
                ]
            }
        });
        
        return {
            status: !!user,
            msg: user ? "Usuário já existe" : "Usuário não encontrado",
            error: user ? null : "Usuário não encontrado"
        };
    } catch (error) {
        return {
            status: false,
            msg: "Erro inesperado ao buscar usuário, tente novamente mais tarde ou entre em contato com o suporte",
            error: `UserModel/getUserByEmail: ${error instanceof Error ? error.message : "Error desconhecido"}`
        };
    }
}
