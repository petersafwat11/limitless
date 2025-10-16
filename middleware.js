import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the route starts with /dashboard
  if (pathname.startsWith("/dashboard")) {
    try {
      // Check for JWT cookie
      const token = request.cookies.get("jwt");

      // Log some key headers safely
      try {
        console.log("Origin header:", request.headers.get("origin"));
        console.log("Cookie header:", request.headers.get("cookie"));
      } catch (headerError) {
        console.log("Could not read headers:", headerError.message);
      }
      console.log("========================");

      // If no token, redirect to login
      if (!token || !token.value || token.value === "loggedout") {
        console.log("Redirecting to login - no valid token found");
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set(
          "message",
          "Please login to access the dashboard"
        );
        return NextResponse.redirect(loginUrl);
      }

      // If token exists, allow access
      console.log("Token found, allowing access to dashboard");
      return NextResponse.next();
    } catch (error) {
      console.error("Middleware error:", error.message);
      // On error, redirect to login as fallback
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set(
        "message",
        "Authentication error, please login again"
      );
      return NextResponse.redirect(loginUrl);
    }
  }

  // For non-dashboard routes, allow access
  return NextResponse.next();
}

export const config = {
  // Match all paths that start with /dashboard
  matcher: ["/dashboard/:path*"],
};
