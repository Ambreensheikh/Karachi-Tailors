import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { isAuthenticated } from '@/lib/admin-auth';
import { connectDB } from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';

export async function POST(request: Request) {
  // 1. Check authentication with await
  const auth = await isAuthenticated();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const contentType = request.headers.get('content-type') || '';
    let title = '';
    let category = 'Bridal Wear';
    let altText = '';
    let folder = 'portfolio';
    let fileToUpload: any = null;

    // Handle FormData (from modern ImageUpload)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File;
      title = formData.get('title') as string;
      category = (formData.get('category') as string) || 'Bridal Wear';
      altText = formData.get('altText') as string;
      folder = (formData.get('folder') as string) || 'portfolio';

      if (!file || !title || !altText) {
        return NextResponse.json(
          { error: 'Missing required fields or file' },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      fileToUpload = `data:${file.type};base64,${Buffer.from(bytes).toString('base64')}`;
    } 
    // Handle JSON (if base64 string was sent directly)
    else {
      const body = await request.json();
      fileToUpload = body.image;
      folder = body.folder || 'portfolio';
      title = body.metadata?.title;
      category = body.metadata?.category || 'Bridal Wear';
      altText = body.metadata?.altText;

      if (!fileToUpload || !title || !altText) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }
    }

    // 2. Upload to Cloudinary with transformations
    const cleanPublicId = `${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;
    const result = await cloudinary.uploader.upload(fileToUpload, {
      folder: `karachi-tailors/${folder}`,
      public_id: cleanPublicId,
      transformation: [
        { width: 1200, height: 1600, crop: 'limit' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
      ],
      context: `title=${title}|alt=${altText}|category=${category}`,
      tags: [folder, category.toLowerCase().replace(/\s+/g, '-')],
    });

    // 3. Save to MongoDB
    await connectDB();
    const portfolioItem = await Portfolio.create({
      title,
      category,
      altText,
      mediaType: 'image',
      mediaUrl: result.secure_url,
      publicId: result.public_id,
    });

    return NextResponse.json({
      success: true,
      data: portfolioItem,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}