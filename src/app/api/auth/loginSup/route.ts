const IV_MASTER = process.env.IV_MASTER;
const LOGIN_MASTER = process.env.LOGIN_MASTER;
const PASSWORD_MASTER = process.env.PASSWORD_MASTER;

//      UTIL.       //
import { NextResponse } from "next/server";
import { encrypt } from "@/utils/crypto";
import { formDataToObject } from "@/utils/form";
import { LoginSupportDTO } from "@/dtos/user.dto";
import AuthService from "@/services/authService";
//     /UTIL.       //

export async function POST(request: Request) {
    try {
        const formData: FormData = await request.formData();
        const data: Record<string, string> = formDataToObject(formData);
        //      VALIDAÇÃO DE DADOS DO USUÁRIO PARA LOGIN DE SUPORTE.        //
        const parse = LoginSupportDTO.safeParse(data);
        if (!parse.success) {
            return NextResponse.json({
                msg: "Dados inválidos",
                error: "Api/auth/loginSup: Dados não correspondem ao formato esperado",
                issues: parse.error.issues,
            }, { status: 422 });
        }
        //      /VALIDAÇÃO DE DADOS DO USUÁRIO PARA LOGIN DE SUPORTE.        //        
        
        const userExists = await AuthService.LoginSupport(data);
        if (!userExists.status) {
            return NextResponse.json({
                msg: userExists.msg,
                error: `${userExists.error}`,
            }, { status: 422 });
        }

        return NextResponse.json({
            msg: "Token gerado com sucesso",
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            msg: "Erro inesperado, tente novamente mais tarde ou entre em contato com o suporte",
            error: `Api/auth/login: ${error instanceof Error ? error.message : "Error desconhecido"}`,
        }, { status: 500 });
    }
}