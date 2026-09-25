import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // We only care about /admin routes
  if (pathname.startsWith('/admin')) {
    // If it's the login page, let it pass
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for the admin_token cookie
    const token = request.cookies.get('admin_token');

    // If there is no token, redirect to login
    if (!token || token.value !== 'authenticated') {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes starting with /admin
  matcher: ['/admin/:path*'],
};
