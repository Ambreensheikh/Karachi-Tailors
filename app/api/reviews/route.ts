import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { connectDB } from '@/lib/mongodb';
import Review from '@/models/Review';

// 1. Positive Keywords (Direct Auto-Approve ke liye)
const POSITIVE_KEYWORDS = [
  'best', 'good', 'better', 'perfect', 'great', 'excellent',
  'amazing', 'superb', 'zabardast', 'shandar', 'loved it',
  'outstanding', 'beautiful', 'fitting', 'satisfied', 'finishing'
];

// 2. Abusive / Fraud Keywords (Direct Auto-Block ke liye)
const BANNED_KEYWORDS = [
  'fraud', 'scam', 'bakwas', 'worst', 'fake', 'chor',
  'rubbish', 'cheater', 'badtameez', 'ganda', 'third class',
  'dog', 'harami', 'chutiya', 'loot', 'bogus', 'hate'
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, rating, comment, service } = body;

    // Validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters long.' },
        { status: 400 }
      );
    }

    const numericRating = Number(rating);
    if (!numericRating || numericRating < 1 || numericRating > 5) {
      return NextResponse.json(
        { error: 'Rating must be a valid number between 1 and 5.' },
        { status: 400 }
      );
    }

    if (!comment || comment.trim().length < 10) {
      return NextResponse.json(
        { error: 'Review comment must be at least 10 characters long.' },
        { status: 400 }
      );
    }

    // IP Address extraction for security
    const headerList = await headers();
    const forwardedFor = headerList.get('x-forwarded-for');
    const realIp = headerList.get('x-real-ip');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp || 'unknown';

    // Smart Moderation Logic
    const cleanComment = comment.toLowerCase();

    const isAbusive = BANNED_KEYWORDS.some((kw) => cleanComment.includes(kw));
    const isPositive = POSITIVE_KEYWORDS.some((kw) => cleanComment.includes(kw));

    let reviewStatus: 'pending' | 'approved' | 'blocked' = 'pending';

    if (isAbusive) {
      // 🚫 Ghalat ya abusive review khud ba khud block ho jayega
      reviewStatus = 'blocked';
    } else if (numericRating >= 4 && isPositive) {
      // ✅ 4/5 star aur achhe alfaz (best, good, perfect, etc.) wale foran live ho jayenge
      reviewStatus = 'approved';
    } else {
      // ⚠️ Baqi saare reviews (jaise low ratings ya neutral comments) pehle aapke dekhne ke liye pending rahenge
      reviewStatus = 'pending';
    }

    await connectDB();

    const newReview = await Review.create({
      name: name.trim(),
      rating: numericRating,
      comment: comment.trim(),
      service: service?.trim() || 'Custom Tailoring',
      status: reviewStatus,
      ip: clientIp,
    });

    return NextResponse.json(
      {
        success: true,
        status: reviewStatus,
        message:
          reviewStatus === 'approved'
            ? 'Thank you! Your verified review is now live.'
            : 'Thank you for your feedback! It has been submitted for review.',
        data: { id: newReview._id },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Review Submission Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit review.' },
      { status: 500 }
    );
  }
}

// Public: Sirf approved reviews website par render honge
export async function GET() {
  try {
    await connectDB();
    const approvedReviews = await Review.find({ status: 'approved' })
      .select('-ip')
      .sort({ createdAt: -1 })
      .limit(12)
      .lean();

    return NextResponse.json({ success: true, data: approvedReviews });
  } catch (error: any) {
    console.error('Fetch Reviews Error:', error);
    return NextResponse.json(
      { error: 'Failed to load reviews.' },
      { status: 500 }
    );
  }
}