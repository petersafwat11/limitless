# Portal Subdomain Setup Guide

## Objective

Configure the application so that:

- Main site: `www.limitlesscover.co.uk`
- Login/Dashboard: `portal.limitlesscover.co.uk/login` and `portal.limitlesscover.co.uk/dashboard`

## Implementation Steps

### 1. Vercel Configuration

#### A. Add Custom Domain in Vercel Dashboard

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add `portal.limitlesscover.co.uk` as a custom domain
4. Vercel will provide DNS records to add

#### B. DNS Configuration

Add these DNS records in your domain provider (e.g., Cloudflare, GoDaddy):

```
Type: CNAME
Name: portal
Value: cname.vercel-dns.com
TTL: Auto
```

### 2. Next.js Middleware for Subdomain Routing

Create or update `middleware.js` in the root of your Next.js project:

```javascript
import { NextResponse } from "next/server";

export function middleware(request) {
  const hostname = request.headers.get("host") || "";
  const url = request.nextUrl;

  // Check if request is from portal subdomain
  const isPortal = hostname.startsWith("portal.");

  // Portal routes (login, dashboard, etc.)
  const portalRoutes = [
    "/login",
    "/dashboard",
    "/forget-password",
    "/change-password",
  ];
  const isPortalRoute = portalRoutes.some((route) =>
    url.pathname.startsWith(route)
  );

  // If portal subdomain but not a portal route, redirect to main site
  if (isPortal && !isPortalRoute) {
    const mainUrl = new URL(url.pathname, `https://www.limitlesscover.co.uk`);
    mainUrl.search = url.search;
    return NextResponse.redirect(mainUrl);
  }

  // If main site but accessing portal route, redirect to portal
  if (!isPortal && isPortalRoute) {
    const portalUrl = new URL(
      url.pathname,
      `https://portal.limitlesscover.co.uk`
    );
    portalUrl.search = url.search;
    return NextResponse.redirect(portalUrl);
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
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

### 3. Update Environment Variables

Add to `.env.local` and Vercel environment variables:

```env
NEXT_PUBLIC_MAIN_DOMAIN=www.limitlesscover.co.uk
NEXT_PUBLIC_PORTAL_DOMAIN=portal.limitlesscover.co.uk
```

### 4. Update Links in Application

Update all login/dashboard links to use the portal subdomain:

**Example in Header.js or navigation components:**

```javascript
// Before
<Link href="/login">Login</Link>

// After
<Link href={`https://portal.limitlesscover.co.uk/login`}>Login</Link>

// Or using environment variable
<Link href={`https://${process.env.NEXT_PUBLIC_PORTAL_DOMAIN}/login`}>Login</Link>
```

### 5. Vercel Deployment Configuration

In `vercel.json` (create if doesn't exist):

```json
{
  "github": {
    "silent": true
  },
  "redirects": [
    {
      "source": "/login",
      "destination": "https://portal.limitlesscover.co.uk/login",
      "permanent": false,
      "has": [
        {
          "type": "host",
          "value": "www.limitlesscover.co.uk"
        }
      ]
    },
    {
      "source": "/dashboard/:path*",
      "destination": "https://portal.limitlesscover.co.uk/dashboard/:path*",
      "permanent": false,
      "has": [
        {
          "type": "host",
          "value": "www.limitlesscover.co.uk"
        }
      ]
    }
  ]
}
```

### 6. Testing

After deployment:

1. **Test Main Site:**

   - Visit `https://www.limitlesscover.co.uk` → Should work normally
   - Try accessing `https://www.limitlesscover.co.uk/login` → Should redirect to portal

2. **Test Portal:**

   - Visit `https://portal.limitlesscover.co.uk/login` → Should show login page
   - Visit `https://portal.limitlesscover.co.uk/dashboard` → Should show dashboard
   - Try accessing `https://portal.limitlesscover.co.uk/` → Should redirect to main site

3. **Test Redirects:**
   - Ensure all login links redirect to portal subdomain
   - Ensure dashboard links use portal subdomain
   - Ensure main site content stays on www subdomain

### 7. Cookie Domain Configuration

If using cookies for authentication, update cookie settings to work across subdomains:

```javascript
// In your auth configuration
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  domain: ".limitlesscover.co.uk", // Note the leading dot for subdomain sharing
  path: "/",
};
```

### 8. CORS Configuration (Backend)

If your backend needs to accept requests from both domains:

```javascript
// In your backend CORS configuration
const allowedOrigins = [
  "https://www.limitlesscover.co.uk",
  "https://portal.limitlesscover.co.uk",
  "http://localhost:3000", // For development
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
```

## Deployment Checklist

- [ ] DNS records configured for portal subdomain
- [ ] Vercel domain added and verified
- [ ] Middleware implemented for subdomain routing
- [ ] Environment variables updated
- [ ] All login/dashboard links updated to use portal subdomain
- [ ] Cookie domain configuration updated (if applicable)
- [ ] Backend CORS configuration updated (if applicable)
- [ ] Tested on staging/preview deployment
- [ ] Deployed to production
- [ ] Verified all redirects work correctly
- [ ] Tested authentication flow across subdomains

## Notes

- DNS propagation can take up to 48 hours (usually much faster)
- Test thoroughly in Vercel preview deployments before production
- Monitor Vercel logs for any redirect or routing issues
- Consider adding subdomain detection in analytics (Google Analytics, etc.)
