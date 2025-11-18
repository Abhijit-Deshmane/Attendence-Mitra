// // middleware.js
// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   // This will read the NextAuth JWT (next-auth.session-token or __Secure-next-auth.session-token)
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   // If no token and trying to access protected pages → redirect
//   const { pathname } = req.nextUrl;

//   // Protect all /dashboard routes (adjust matcher below as well)
//   if (pathname.startsWith("/dashboard")) {
//     if (!token) {
//       const url = req.nextUrl.clone();
//       url.pathname = "/auth/signin";
//       // optionally add redirect back param
//       url.searchParams.set("callbackUrl", req.nextUrl.pathname);
//       return NextResponse.redirect(url);
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/dashboard"],
// };



import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // 1️⃣ Protect all dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
  }

  // 2️⃣ If user is logged in -> prevent access to login/signup pages
  if (pathname.startsWith("/auth") && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",  // protect dashboard
    "/auth/:path*",       // redirect logged-in users away from signin/signup
  ],
};
