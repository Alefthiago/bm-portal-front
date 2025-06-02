
//      VERIFICA DE CAMPOS OBRIGATÓRIOS NO FORMULÁRIO.      //
export function verifyFildsFormRequired(
    data: FormData,
    fields: string[]
): boolean {
    return fields.some((field) => !data.get(field));
}

export function formDataToObject(formData: FormData): Record<string, string> {
  const data: Record<string, string> = {};
  formData.forEach((value, key) => {
    data[key] = value.toString();
  });
  return data;
}
//     /VERIFICA DE CAMPOS OBRIGATÓRIOS NO FORMULÁRIO.      //