export default class AppResponse {
  public msg: string;
  public error?: string | null;
  public data?: any;
  public status: boolean;

  constructor(
    msg: string,
    status: boolean = true,
    data: any = null,
    error: string | null = null
  ) {
    this.msg = msg;
    this.status = status;
    this.data = data;
    this.error = error;
  }

  // ✅ Método estático para sucesso
  static success(msg: string, data: any = null): AppResponse {
    return new AppResponse(msg, true, data, null);
  }

  // ❌ Método estático para erro
  static error(msg: string, error: string, data: any = null): AppResponse {
    return new AppResponse(msg, false, data, error);
  }
}