import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

const publicRoutes = [
  "/",
  "/new-verification"
];

const authRoutes = [
  "/login",
  "/register",
  "/error",
  "/forgot-password",
  "/new-password"
];

const apiAuthPrefix = "/api/auth";

const DEFAULT_LOGIN_REDIRECT = "/settings";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    // return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    // return null;
  }

  // if (!isLoggedIn && !isPublicRoute) {
  //   let callbackUrl = nextUrl.pathname;
  //   if (nextUrl.search) {
  //     callbackUrl += nextUrl.search;
  //   }

  //   const encodedCallbackUrl = encodeURIComponent(callbackUrl);

  //   return Response.redirect(new URL(
  //     `/login?callbackUrl=${encodedCallbackUrl}`,
  //     nextUrl
  //   ));
  // }

  // return null;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}