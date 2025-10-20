import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("jwt");

    // Redirect to login if no valid token
    if (!token || !token.value || token.value === "loggedout") {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("message", "Please login to access the dashboard");
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths that start with /dashboard
  matcher: ["/dashboard/:path*"],
};
