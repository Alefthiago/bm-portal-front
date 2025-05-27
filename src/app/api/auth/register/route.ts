//      UTILS.      //
import { NextRequest, NextResponse } from "next/server";
import { verifyFildsFormRequired } from "@/utils/functions";
//     /UTILS.      //

//      CRIAÇÃO DE USUÁRIO.      //
export async function POST(request: NextRequest) {
    try {
        const data: FormData = await request.formData(); // inputs login, name, email, password, passwordConfirm
        const fieldsRequired: string[] = ["login", "name", "email", "password", "passwordConfirm"];

        if (verifyFildsFormRequired(data, fieldsRequired)) {
            return NextResponse.json({
                msg: "Preencha todos os campos obrigatórios",
                error: "Api/auth/register: Campos obrigatórios não preenchidos"
            }, { status: 422 });
        }

        if (data.get("password") !== data.get("passwordConfirm")) {
            return NextResponse.json({
                msg: "As senhas precisam ser iguais",
                error: "Api/auth/register: As senhas não coincidem"
            }, { status: 422 });
        }

        

    } catch (error) {
        return NextResponse.json({
            msg: "Erro inesperado, tente novamente mais tarde ou entre em contato com o suporte",
            error: `Api/auth/register: ${error instanceof Error ? error.message : "Error desconhecido"}`,
        }, { status: 500 });
    }
}
//      CRIAÇÃO DE USUÁRIO.      //
