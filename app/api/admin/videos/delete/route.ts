import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { isAuthenticated } from '@/lib/admin-auth';

export async function POST(request: Request) {
  try {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    const formData = await request.formData();
    const publicId = formData.get('public_id') as string;

    if (!publicId) {
      return NextResponse.json({ error: 'public_id is required' }, { status: 400 });
    }

    // Cloudinary se video delete karne ke liye resource_type: 'video' lazmi hai
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'video',
    });

    if (result.result !== 'ok') {
      return NextResponse.json({ error: 'Failed to delete video from Cloudinary' }, { status: 500 });
    }

    return NextResponse.redirect(new URL('/admin/videos', request.url));
  } catch (error: any) {
    console.error('Delete Video Error:', error);
    return NextResponse.json(
      { error: error.message || 'Server error while deleting video' },
      { status: 500 }
    );
  }
}