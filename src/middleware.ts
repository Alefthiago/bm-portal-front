import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
// import { auth } from "@/lib/auth";

const rotasPublicas: Array<{ path: string; whenAuth: string; }> = [
    { path: '/login', whenAuth: 'redirect' },
    { path: '/register', whenAuth: 'redirect' }
] as const;

const ROTA_LOGIN: string = '/login';

export async function middleware(request: NextRequest) {
    const caminhoAtual: string = request.nextUrl.pathname;
    const rotaPublica = rotasPublicas.find(rota => rota.path == caminhoAtual);
    // const session = await auth();
    const session = request.cookies.get('authjs.session-token')?.value;

    if (!session && rotaPublica) {
        return NextResponse.next();
    }

    if (!session && !rotaPublica) {
        let redirect = request.nextUrl.clone();
        redirect.pathname = ROTA_LOGIN;
        return NextResponse.redirect(redirect);
    }

    if (session && rotaPublica && rotaPublica.whenAuth === 'redirect') {
        let redirect = request.nextUrl.clone();
        redirect.pathname = '/';

        return NextResponse.redirect(redirect);
    }

    if (session && !rotaPublica) {
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config: MiddlewareConfig = {
    matcher: [
        /*
        * Match all request paths except for the ones starting with:
        * - api (API routes)
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico, sitemap.xml, robots.txt (metadata files)
        */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|bm.svg).*)',
        //    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}