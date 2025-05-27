import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

    } catch (erro) {
        return NextResponse.json({
            msg: "Erro ao processar a requisição",
            error: erro instanceof Error ? erro.message : "Erro desconhecido"
        }, { status: 400 });
    }
}
export async function GET(request: NextRequest) {
    try {
        return NextResponse.json({
            msg: "carai"
        }, {status: 404});
    } catch (erro) {

    }
}