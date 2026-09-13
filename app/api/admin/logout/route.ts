import { NextResponse } from 'next/server';
import { destroySession } from '@/lib/admin-auth';

export async function POST() {
  destroySession();
  return NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_SITE_URL));
}