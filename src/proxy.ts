import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const token = req.cookies.get("token")?.value;

  
  const userId = token ? getUserIdFromToken(token) : null;

  const isAuthPage = path === "/login" || path === "/signup";
  const isProfilePage = path === "/profile" || path.startsWith("/profile/");

  
  if (isAuthPage && userId) {
    return NextResponse.redirect(new URL(`/profile/${userId}`, req.url));
  }

  if (isProfilePage && !userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }


  if(userId && path === "/") {
    return NextResponse.redirect(new URL(`/profile/${userId}`, req.url));
  }
}

function getUserIdFromToken(token: string): string | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as {
      userId?: string;
    };

    return decoded.userId ?? null;
  } catch {
    return null;
  }
}

export const config = {
  matcher: ["/", "/profile", "/profile/:path*", "/login", "/signup"],
};
