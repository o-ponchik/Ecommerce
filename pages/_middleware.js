import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const jwt = request.cookies?.OursiteJWT;

  if (request.nextUrl.pathname.includes("/admin")) {
    if (!jwt) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode("secret")
      );
    } catch (err) {
      console.error({ err });
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard", "/admin/list/orders"],
};
