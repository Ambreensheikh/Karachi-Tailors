import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import { connectDB } from '@/lib/mongodb';
import Review from '@/models/Review';

// 1. Admin GET: Tamam reviews (pending, approved, blocked) fetch karne ke liye
export async function GET() {
  try {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    await connectDB();
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: reviews });
  } catch (error: any) {
    console.error('Admin Fetch Reviews Error:', error);
    return NextResponse.json(
      { error: error.message || 'Server error fetching reviews.' },
      { status: 500 }
    );
  }
}

// 2. Status change karna: 'pending' -> 'approved' / 'blocked'
export async function PATCH(request: Request) {
  try {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    const { id, status } = await request.json();

    if (!id || !['pending', 'approved', 'blocked'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid review ID or status provided.' },
        { status: 400 }
      );
    }

    await connectDB();
    const updated = await Review.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error('Update Review Status Error:', error);
    return NextResponse.json(
      { error: error.message || 'Server error updating review.' },
      { status: 500 }
    );
  }
}

// 3. Review ko permanent delete karna
export async function DELETE(request: Request) {
  try {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
    }

    await connectDB();
    const deleted = await Review.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Review deleted successfully.' });
  } catch (error: any) {
    console.error('Delete Review Error:', error);
    return NextResponse.json(
      { error: error.message || 'Server error deleting review.' },
      { status: 500 }
    );
  }
}