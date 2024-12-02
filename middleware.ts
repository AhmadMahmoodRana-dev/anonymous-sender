import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    // Redirect authenticated users away from auth pages to dashboard, but avoid looping if they're already on /dashboard
    if (token) {
        if (
            url.pathname.startsWith("/sign-in") ||
            url.pathname.startsWith("/sign-up") ||
            url.pathname.startsWith("/verify")
        ) {
            if (url.pathname !== "/dashboard") {
                return NextResponse.redirect(new URL("/dashboard", request.url));
            }
        }
    } else {
        // Redirect unauthenticated users away from protected pages to home, but avoid looping if they're already on /home
        if (url.pathname.startsWith("/dashboard") || url.pathname === "/") {
            if (url.pathname !== "/sign-in") {
                return NextResponse.redirect(new URL("/sign-in", request.url));
            }
        }
    }

    // Allow access if none of the conditions match
    return NextResponse.next();
}

export const config = {
    matcher: ["/sign-in", "/sign-up", "/", "/dashboard/:path*", "/verify/:path*"],
};
