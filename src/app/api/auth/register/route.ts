//      UTILS.      //
import { NextRequest, NextResponse } from "next/server";
import { formDataToObject } from "@/utils/form";
import AuthService from "@/services/authService";
import AppResponse from "@/utils/appResponse";
import { RegisterUserDTO, RegisterUserDTOType } from "@/dtos/registerUser.dto";
//     /UTILS.      //

//      CRIAÇÃO DE USUÁRIO.      //
export async function POST(request: NextRequest) {
    try {
        const formData: FormData = await request.formData(); // inputs login, name, email, password, passwordConfirm
        const data = formDataToObject(formData);
        
        const parse = RegisterUserDTO.safeParse(data);
        if (!parse.success) {
            
        }

        // const fieldsRequired: string[] = ["login", "name", "email", "password", "passwordConfirm"];
        // if (verifyFildsFormRequired(data, fieldsRequired)) {
        //     return NextResponse.json({
        //         msg: "Preencha todos os campos obrigatórios",
        //         error: "Api/auth/register: Campos obrigatórios não preenchidos"
        //     }, { status: 422 });
        // }

        // if (data.get("password") !== data.get("passwordConfirm")) {
        //     return NextResponse.json({
        //         msg: "As senhas precisam ser iguais",
        //         error: "Api/auth/register: As senhas não coincidem"
        //     }, { status: 422 });
        // }

        const createdUser: AppResponse = await AuthService.createUser(formData);
        if (!createdUser.status) {
            return NextResponse.json({
                msg: createdUser.msg,
                error: createdUser.error,
            }, { status: 422 });
        }

        // const gereratedJwt: AppResponse = await AuthService.generateJwt(createdUser.data.id);

        return NextResponse.json({
            msg: createdUser.msg,
            data: createdUser.data,
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            msg: "Erro inesperado, tente novamente mais tarde ou entre em contato com o suporte",
            error: `Api/auth/register: ${error instanceof Error ? error.message : "Error desconhecido"}`,
        }, { status: 500 });
    }
}
//      CRIAÇÃO DE USUÁRIO.      //
