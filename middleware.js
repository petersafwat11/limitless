import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the route starts with /dashboard
  if (pathname.startsWith("/dashboard")) {
    // Check for JWT cookie
    const token = request.cookies.get("jwt");

    // Debug logging for Vercel
    console.log("=== MIDDLEWARE DEBUG ===");
    console.log("Pathname:", pathname);
    console.log("Request URL:", request.url);
    console.log(
      "Request headers:",
      Object.fromEntries(request.headers.entries())
    );
    console.log("All cookies:", Object.fromEntries(request.cookies.entries()));
    console.log("JWT Token object:", token);
    console.log("JWT Token value:", token?.value);
    console.log("Token exists:", !!token);
    console.log("Token value exists:", !!token?.value);
    console.log("Token value is loggedout:", token?.value === "loggedout");
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
  }

  // For non-dashboard routes, allow access
  return NextResponse.next();
}

export const config = {
  // Match all paths that start with /dashboard
  matcher: ["/dashboard/:path*"],
};
