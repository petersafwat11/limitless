import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the route starts with /dashboard
  if (pathname.startsWith("/dashboard")) {
    // Check for JWT cookie
    const token = request.cookies.get("jwt");

    // If no token, redirect to login
    if (!token || !token.value || token.value === "loggedout") {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set(
        "message",
        "Please login to access the dashboard"
      );
      return NextResponse.redirect(loginUrl);
    }

    // If token exists, allow access
    return NextResponse.next();
  }

  // For non-dashboard routes, allow access
  return NextResponse.next();
}

export const config = {
  // Match all paths that start with /dashboard
  matcher: ["/dashboard/:path*"],
};
