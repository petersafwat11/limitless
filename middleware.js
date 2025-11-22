import { NextResponse } from "next/server";

export function middleware(request) {
  const hostname = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  // Check if request is from portal subdomain
  const isPortal = hostname.startsWith("portal.");
  const isLocalhost = hostname.includes("localhost");

  // Portal routes (login, dashboard, etc.)
  const portalRoutes = [
    "/login",
    "/dashboard",
    "/forget-password",
    "/change-password",
    "/retrieve-quote",
  ];
  const isPortalRoute = portalRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // DISABLED: Subdomain logic - serving all routes from main domain
  // Skip subdomain logic for localhost
  // if (!isLocalhost) {
  //   // If portal subdomain but not a portal route, redirect to main site
  //   if (isPortal && !isPortalRoute) {
  //     const mainUrl = new URL(pathname, `https://www.limitlesscover.co.uk`);
  //     mainUrl.search = request.nextUrl.search;
  //     return NextResponse.redirect(mainUrl);
  //   }

  //   // If main site but accessing portal route, redirect to portal
  //   if (!isPortal && isPortalRoute) {
  //     const portalUrl = new URL(
  //       pathname,
  //       `https://portal.limitlesscover.co.uk`
  //     );
  //     portalUrl.search = request.nextUrl.search;
  //     return NextResponse.redirect(portalUrl);
  //   }
  // }

  // Auth protection for dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("jwt");

    // Redirect to login if no valid token
    // Check for missing token, empty value, or logout placeholder
    if (
      !token ||
      !token.value ||
      token.value.trim() === "" ||
      token.value === "loggedout" ||
      token.value === "null" ||
      token.value === "undefined"
    ) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set(
        "message",
        "Please login to access the dashboard"
      );
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
