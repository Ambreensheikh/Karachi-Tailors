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
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const folder = (formData.get('folder') as string) || 'videos';

    if (!file || !title) {
      return NextResponse.json(
        { error: 'Video file and title are required' },
        { status: 400 }
      );
    }

    if (!file.type.startsWith('video/')) {
      return NextResponse.json(
        { error: 'Only video files (MP4, WEBM, MOV) are allowed' },
        { status: 400 }
      );
    }

    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Video size must be less than 50MB' },
        { status: 400 }
      );
    }

    // SEO-friendly clean slug for URL
    const sanitizedTitle = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const publicId = `${sanitizedTitle}-${Date.now()}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload Stream with SEO Tags and Optimizations
    const result: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          folder: `karachi-tailors/${folder}`,
          public_id: publicId,
          // SEO Tags for Discovery
          tags: ['karachi-tailors', 'tailoring-craftsmanship', 'bridal-wear-islamabad', sanitizedTitle],
          transformation: [
            { width: 1280, crop: 'limit' },
            { quality: 'auto:good' },
            { fetch_format: 'auto' },
          ],
          context: {
            title: title,
            caption: `${title} - Tailored by Karachi Tailors`,
          },
        },
        (error, uploadResult) => {
          if (error) reject(error);
          else resolve(uploadResult);
        }
      );
      uploadStream.end(buffer);
    });

    // Auto-generate high-quality thumbnail image URL for Google VideoObject Schema
    const thumbnailUrl = cloudinary.url(result.public_id, {
      resource_type: 'video',
      format: 'jpg',
      transformation: [{ so_extract: 'auto' }, { width: 1280, crop: 'limit' }],
    });

    return NextResponse.json({
      success: true,
      data: {
        public_id: result.public_id,
        url: result.secure_url,
        thumbnailUrl: thumbnailUrl, // Crucial for Google Schema
        title: title,
        duration: result.duration,
      },
    });
  } catch (error: any) {
    console.error('Video Upload Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload video to Cloudinary' },
      { status: 500 }
    );
  }
}