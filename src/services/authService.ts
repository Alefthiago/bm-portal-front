const apiUrlGeneteToken = process.env.API_URL_GENETE_TOKEN;
const apiUrlValidateToken = process.env.API_URL_VALIDATE_TOKEN;
const loginMaster = process.env.LOGIN_MASTER;
const passwordMaster = process.env.PASSWORD_MASTER;
const ivMaster = process.env.IV_MASTER;
if (!apiUrlGeneteToken || !apiUrlValidateToken || !loginMaster || !passwordMaster || !ivMaster) {
    throw new Error("Variáveis de ambiente não estão definidas");
}

//      UTIL.      //
import UserModel from "@/models/userModel";
import AppResponse from "@/utils/appResponse";
import { decrypt } from "@/utils/crypto";
//     /UTIL.      //

export default class AuthService {
    static async generateAccessToken(formData: FormData): Promise<AppResponse> {
        try {
            const geneteAccessToken = await fetch(apiUrlGeneteToken as string, {
                method: "POST",
                body: formData,
            });

            if (!geneteAccessToken.ok) {
                let contentType = geneteAccessToken.headers.get("content-type");
                let error: string;

                if (contentType && contentType.includes("application/json")) {
                    let errorData = await geneteAccessToken.json();
                    error = errorData.error || "Erro desconhecido";
                    console.error("Erro ao criar conta:", errorData.error);
                } else {
                    let errorText = await geneteAccessToken.text();
                    error = errorText || "Erro desconhecido";
                    console.error("Erro ao criar conta:", errorText);
                }

                return AppResponse.error(
                    "Erro ao gerar token de acesso",
                    `AuthService/generateAccessToken: ${error}`
                );
            }

            const responseData = await geneteAccessToken.json();
            if (!responseData || !responseData.success) {
                return AppResponse.error(
                    responseData?.message || "Resposta inválida da API de geração de token",
                    `AuthService/generateAccessToken: Resposta inválida da API de geração de token`
                );
            }

            return AppResponse.success("Token gerado com sucesso");
        } catch (error) {
            return AppResponse.error(
                "Erro ao gerar token de acesso",
                `AuthService/generateAccessToken: ${error instanceof Error ? error.message : "Erro desconhecido"}`
            );
        }
    }

    static async validateAccessToken(token: string, phone: string, document: string): Promise<AppResponse> {
        try {
            const validateAccessToken = await fetch(apiUrlValidateToken as string, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    phone: phone.replace(/\D/g, ""),
                    cnpj: document.replace(/\D/g, ""),
                }),
            });

            if (!validateAccessToken.ok) {
                let contentType = validateAccessToken.headers.get("content-type");
                let error: string;

                if (contentType && contentType.includes("application/json")) {
                    let errorData = await validateAccessToken.json();
                    error = errorData.error || "Erro desconhecido";
                    console.error("Erro ao validar token:", errorData.error);
                } else {
                    let errorText = await validateAccessToken.text();
                    error = errorText || "Erro desconhecido";
                    console.error("Erro ao validar token:", errorText);
                }

                return AppResponse.error(
                    "Erro ao validar token de acesso",
                    `AuthService/validateAccessToken: ${error}`
                );
            }

            const responseData = await validateAccessToken.json();
            console.log("Resposta da API de validação de token:", responseData);
            if (!responseData || !responseData.status) {
                return AppResponse.error(
                    responseData?.message || "Resposta inválida da API de validação de token",
                    `AuthService/validateAccessToken: Resposta inválida da API de validação de token`
                );
            }

            return AppResponse.success("Token validado com sucesso");
        } catch (error) {
            return AppResponse.error(
                "Erro ao validar token de acesso",
                `AuthService/validateAccessToken: ${error instanceof Error ? error.message : "Erro desconhecido"}`
            );
        }
    }

    static async LoginSupport(data: Record<string, string>): Promise<AppResponse> {
        try {
            if (!data.login || !data.password) {
                return AppResponse.error(
                    "Login e senha são obrigatórios",
                    "AuthService/loginSupport: Dados de login inválidos"
                );
            }

            if (data.login === loginMaster && ivMaster !== undefined) { // LOGIN MASTER
                if (passwordMaster !== undefined) {
                    const decryptedPassword = decrypt(passwordMaster, ivMaster);
                    if (data.password !== decryptedPassword) {
                        return AppResponse.error(
                            "Dados de login inválidos",
                            "AuthService/loginSupport: Senha mestre não corresponde"
                        );
                    }
                } else {
                    return AppResponse.error(
                        "Dados de login inválidos",
                        "AuthService/loginSupport: Senha mestre não encontrada"
                    );
                }
            } else { // LOGIN DE FUNCIONÁRIO
                const user: AppResponse = await UserModel.getUserByLogin(data.login);
                if (!user.status) {
                    return AppResponse.error(
                        user.msg,
                        user.error || "AuthService/loginSupport: Usuário não encontrado"
                    );
                }

                if (!user.data.iv) {
                    return AppResponse.error(
                        "Não foi possível realizar o login",
                        "AuthService/loginSupport: IV não encontrado"
                    );
                }

                if (!user.data.password) {
                    return AppResponse.error(
                        "Não foi possível realizar o login",
                        "AuthService/loginSupport: Senha não encontrada"
                    );
                }

                const decryptedPassword = decrypt(user.data.password, user.data.iv);
                if (data.password !== decryptedPassword) {
                    return AppResponse.error(
                        "Dados de login inválidos",
                        "AuthService/loginSupport: Senha não corresponde"
                    );
                }
            }

            return AppResponse.success("Login de suporte realizado com sucesso", {
                id: data.login
            });
        } catch (error) {
            return AppResponse.error(
                "Erro ao realizar login de suporte",
                `AuthService/loginSupport: ${error instanceof Error ? error.message : "Erro desconhecido"}`
            );
        }
    }
}