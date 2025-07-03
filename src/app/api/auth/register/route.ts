//      UTILS.      //
import { NextRequest, NextResponse } from "next/server";
import { formDataToObject } from "@/utils/form";
import AuthService from "@/services/authService";
import AppResponse from "@/utils/appResponse";
import { RegisterUserDTO } from "@/dtos/user.dto";
//     /UTILS.      //

//      CRIAÇÃO DE USUÁRIO.      //
export async function POST(request: NextRequest) {
    try {
        const formData: FormData = await request.formData(); // inputs login, name, email, password, passwordConfirm
        const data: Record<string, string> = formDataToObject(formData);

        //      Validação dos dados recebidos.      //
        const parse = RegisterUserDTO.safeParse(data);
        if (!parse.success) {
            return NextResponse.json({
                msg: "Dados inválidos",
                error: "Api/auth/register: Dados não correspondem ao formato esperado",
                issues: parse.error.issues,
            }, { status: 422 });
        }
        //     /Validação dos dados recebidos.      //

        const createdUser: AppResponse = await AuthService.createUser(data);
        if (!createdUser.status) {
            return NextResponse.json({
                msg: createdUser.msg,
                error: createdUser.error
            }, { status: 422 });
        }

        const genetedTokenConfirmAccount: string = Math.floor(Math.random() * 0x10000).toString(16).padStart(4, '0');
        return NextResponse.json({
            msg: createdUser.msg,
            data: {
                tokenConfirmAccount: genetedTokenConfirmAccount
            }
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            msg: "Erro inesperado, tente novamente mais tarde ou entre em contato com o suporte",
            error: `Api/auth/register: ${error instanceof Error ? error.message : "Error desconhecido"}`,
        }, { status: 500 });
    }
}
//      CRIAÇÃO DE USUÁRIO.      //