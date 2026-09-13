import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import cloudinary from '@/lib/cloudinary';
import { isAuthenticated } from '@/lib/admin-auth';
import { connectDB } from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';

export async function POST(request: Request) {
  // 1. Auth check with await
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    let public_id = '';
    const contentType = request.headers.get('content-type') || '';

    // Handle both HTML form submission and JSON fetch
    if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      public_id = formData.get('public_id') as string;
    } else {
      const body = await request.json();
      public_id = body.public_id;
    }

    if (!public_id) {
      return NextResponse.json(
        { error: 'Public ID is required' },
        { status: 400 }
      );
    }

    // 2. Cloudinary se delete karein
    await cloudinary.uploader.destroy(public_id);

    // 3. MongoDB se document delete karein
    await connectDB();
    await Portfolio.findOneAndDelete({ publicId: public_id });

    // 4. Cache revalidate karein taake page refresh hone par image gayab ho jaye
    revalidatePath('/admin/portfolio');
    revalidatePath('/admin/dashboard');

    // Agar standard form submit hua tha to wapas gallery page par redirect karein
    if (contentType.includes('form')) {
      return NextResponse.redirect(new URL('/admin/portfolio', request.url), 303);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete image' },
      { status: 500 }
    );
  }
}