 //      UTIL.       //
import { formDataToObject } from "@/utils/form";
import { LoginUserDTO } from "@/dtos/user.dto";
import AuthService from "@/services/authService";
import AppResponse from "@/utils/appResponse";
import { NextResponse } from "next/server";
//     /UTIL.       //

//      CRIAÇÃO DE TOKEN DE CONFIRMAÇÃO DE TELEFONE.      //
export async function POST(request: Request) {
    try {
        const formData: FormData = await request.formData();
        //      Validação dos dados recebidos.      //
        const parse = LoginUserDTO.safeParse(formDataToObject(formData));
        if (!parse.success) {
            return NextResponse.json({
                msg: "Dados inválidos",
                error: "Api/auth/login: Dados não correspondem ao formato esperado",
                issues: parse.error.issues,
            }, { status: 422 });
        }
        //     /Validação dos dados recebidos.      //

        // const data: Record<string, string> = formDataToObject(formData);
        // data.phone = data.phone.replace(/\D/g, '');
        // data.document = data.document.replace(/\D/g, '');

        const toGenerateToken: AppResponse = await AuthService.generateAccessToken(formData);
        if (!toGenerateToken.status) {
            return NextResponse.json({
                msg: toGenerateToken.msg,
                error: toGenerateToken.error
            }, { status: 422 });
        }

        return NextResponse.json({
            msg: "Token gerado com sucesso"
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            msg: "Erro inesperado, tente novamente mais tarde ou entre em contato com o suporte",
            error: `Api/auth/login: ${error instanceof Error ? error.message : "Error desconhecido"}`,
        }, { status: 500 });
    }
};
//     /CRIAÇÃO DE TOKEN DE CONFIRMAÇÃO DE TELEFONE.      //

//      VALIDAÇÃO DE NUMERO DE WHATSAPP.      //
export async function GET(request: Request) {
    try {
        const phone: string | null = request.url.split("?")[1]?.split("=")[1] || null;
        if (!phone) {
            return NextResponse.json({
                msg: "Número de WhatsApp não fornecido",
                error: "Api/auth/confirmPhone: Número de WhatsApp não fornecido"
            }, { status: 422 });
        }

        const document: string | null = request.url.split("?")[1]?.split("&")[1]?.split("=")[1] || null;
        if (!document) {
            return NextResponse.json({
                msg: "Documento não fornecido",
                error: "Api/auth/confirmPhone: Documento não fornecido"
            }, { status: 422 });
        }

        const opt: string | null = request.url.split("?")[1]?.split("&")[2]?.split("=")[1] || null;
        if (!opt) {
            return NextResponse.json({
                msg: "Código não fornecido",
                error: "Api/auth/confirmPhone: Código OTP não fornecido"
            }, { status: 422 });
        }

        const validationAccessToken: AppResponse = await AuthService.validateAccessToken(opt, phone, document);
        if (!validationAccessToken.status) {
            return NextResponse.json({
                msg: validationAccessToken.msg,
                error: validationAccessToken.error
            }, { status: 422 });
        }

        return NextResponse.json({
            msg: "Código valido com sucesso"
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            msg: "Erro inesperado, tente novamente mais tarde ou entre em contato com o suporte",
            error: `Api/auth/confirmPhone: ${error instanceof Error ? error.message : "Error desconhecido"}`,
        }, { status: 500 });
    }
}
//     /VALIDAÇÃO DE NUMERO DE WHATSAPP.      //