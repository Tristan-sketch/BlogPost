import { NextResponse, type NextRequest } from "next/server";

const publicPaths = ["/", "/login", "/register"];

// Sends visitors without a session cookie to the login page.
// The session itself is checked on the server in getCurrentUser().
export function middleware(request: NextRequest) {
  const isPublic = publicPaths.includes(request.nextUrl.pathname);
  if (!isPublic && !request.cookies.has("session")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};
