import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminSession = request.cookies.get('admin_session')?.value;
  const staffSession = request.cookies.get('staff_session')?.value;
  const { pathname } = request.nextUrl;

  // If trying to access admin login page while already authenticated as admin
  if (pathname === '/admin' && adminSession === 'authenticated') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // If trying to access staff login page while already authenticated
  if (pathname === '/staff' && (staffSession === 'authenticated' || adminSession === 'authenticated')) {
    return NextResponse.redirect(new URL('/staff/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/staff'],
};
