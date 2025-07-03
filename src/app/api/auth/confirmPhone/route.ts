//      UTIL.       //
import { formDataToObject } from "@/utils/form";
import { set } from "zod";
//     /UTIL.       //

//      CRIAÇÃO DE TOKEN DE CONFIRMAÇÃO DE TELEFONE.      //
export async function POST(request: Request) {
    try {
        const formData: FormData = await request.formData(); // inputs phone
        const data: Record<string, string> = formDataToObject(formData);
        formData.set("phone", data.phone.replace(/\D/g, '').trim());

        //      Validação dos dados recebidos.      //
        if (!data.phone || typeof data.phone !== 'string' || data.phone.length < 10) {
            return new Response(JSON.stringify({
                msg: "Número de telefone inválido",
                error: "Api/auth/confirmPhone: Número de telefone não corresponde ao formato esperado",
            }), { status: 422 });
        }
        //     /Validação dos dados recebidos.      //

    } catch (error) {
        return new Response(JSON.stringify({
            msg: "Erro inesperado, tente novamente mais tarde ou entre em contato com o suporte",
            error: `Api/auth/confirmPhone: ${error instanceof Error ? error.message : "Error desconhecido"}`,
        }), { status: 500 });
    }
}
//     /CRIAÇÃO DE TOKEN DE CONFIRMAÇÃO DE TELEFONE.      //

//      VALIDAÇÃO DE NUMERO DE WHATSAPP.      //
export async function GET(request: Request) {
    try {
        setTimeout(() => {
            // Simula um atraso de 10 segundos para o teste
        }, 5000);

        return new Response(JSON.stringify({
            msg: "Token gerado com sucesso"
        }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({
            msg: "Erro inesperado, tente novamente mais tarde ou entre em contato com o suporte",
            error: `Api/auth/confirmPhone: ${error instanceof Error ? error.message : "Error desconhecido"}`,
        }), { status: 500 });
    }
}
//     /VALIDAÇÃO DE NUMERO DE WHATSAPP.      //