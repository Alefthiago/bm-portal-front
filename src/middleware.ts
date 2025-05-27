import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const rotasPublicas: Array<{ path: string; whenAuth: string; }> = [
    { path: '/login', whenAuth: 'redirect' },
    { path: '/register', whenAuth: 'redirect' }
] as const;

const ROTA_LOGIN: string = '/login';

export function middleware(request: NextRequest) {
    const caminhoAtual: string = request.nextUrl.pathname;
    const rotaPublica = rotasPublicas.find(rota => rota.path == caminhoAtual);
    const jwt = request.cookies.get('bmPortalJwt');

    if (!jwt && rotaPublica) {
        return NextResponse.next();
    }

    if (!jwt && !rotaPublica) {
        let redirect = request.nextUrl.clone();
        redirect.pathname = ROTA_LOGIN;

        return NextResponse.redirect(redirect);
    }

    if (jwt && rotaPublica && rotaPublica.whenAuth === 'redirect') {
        let redirect = request.nextUrl.clone();
        redirect.pathname = '/';

        return NextResponse.redirect(redirect);
    }

    if (jwt && !rotaPublica) {
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
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}