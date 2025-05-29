
//      VERIFICA DE CAMPOS OBRIGATÓRIOS NO FORMULÁRIO.      //
export function verifyFildsFormRequired(
    data: FormData,
    fields: string[]
): boolean {
    return fields.some((field) => !data.get(field));
}
//     /VERIFICA DE CAMPOS OBRIGATÓRIOS NO FORMULÁRIO.      //