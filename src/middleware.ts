import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes: Array<{ path: string; whenAuth: string; }> = [
    { path: '/login', whenAuth: 'redirect' },
    { path: '/register', whenAuth: 'redirect' }
] as const;

const ROUTE_LOGIN: string = '/login';

export function middleware(request: NextRequest) {
    const pathCurrent: string = request.nextUrl.pathname;
    const publicRoute = publicRoutes.find(route => route.path == pathCurrent);
    const session = request.cookies.get('authjs.session-token')?.value;

    if (!session && publicRoute) {
        return NextResponse.next();
    }

    if (!session && !publicRoute) {
        let redirect = request.nextUrl.clone();
        redirect.pathname = ROUTE_LOGIN;
        return NextResponse.redirect(redirect);
    }

    if (session && publicRoute && publicRoute.whenAuth === 'redirect') {
        let redirect = request.nextUrl.clone();
        redirect.pathname = '/';

        return NextResponse.redirect(redirect);
    }

    if (session && !publicRoute) {
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
    ],
}