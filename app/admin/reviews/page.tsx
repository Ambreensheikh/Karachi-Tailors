'use client';

import { useState, useEffect } from 'react';
import { Star, CheckCircle, Ban, Trash2, Loader2, ShieldAlert } from 'lucide-react';

interface ReviewItem {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  service?: string;
  status: 'pending' | 'approved' | 'blocked';
  ip?: string;
  createdAt: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'blocked'>('all');

  const fetchAdminReviews = async () => {
    try {
      setLoading(true);
      // Fetching directly or via helper
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (data.success) {
        setReviews(data.data || []);
      }
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminReviews();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: 'approved' | 'blocked' | 'pending') => {
    try {
      setActionLoading(id);
      const res = await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setReviews((prev) =>
          prev.map((rev) => (rev._id === id ? { ...rev, status: newStatus } : rev))
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this review?')) return;
    try {
      setActionLoading(id);
      const res = await fetch(`/api/admin/reviews?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setReviews((prev) => prev.filter((rev) => rev._id !== id));
      }
    } catch (err) {
      console.error('Error deleting review:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredReviews = reviews.filter((r) =>
    filter === 'all' ? true : r.status === filter
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-yellow-600/20 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Client <span className="text-yellow-400">Reviews &amp; Moderation</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Moderate testimonials, approve verified clients, and filter automated spam.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 bg-[#141414] p-1.5 rounded-lg border border-yellow-600/20">
          {(['all', 'pending', 'approved', 'blocked'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition ${
                filter === tab
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-yellow-400 gap-3">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-sm">Loading reviews...</span>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="text-center py-16 bg-[#121212] border border-yellow-600/20 rounded-xl p-8">
          <ShieldAlert className="w-10 h-10 text-yellow-500/50 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No reviews found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev._id}
              className={`bg-[#141414] rounded-xl p-5 border flex flex-col justify-between transition ${
                rev.status === 'blocked'
                  ? 'border-red-500/40 bg-red-950/10'
                  : rev.status === 'approved'
                  ? 'border-green-500/30'
                  : 'border-yellow-600/20'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-sm">{rev.name}</h3>
                    <span className="text-[11px] text-yellow-500/80">{rev.service}</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      rev.status === 'approved'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : rev.status === 'blocked'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}
                  >
                    {rev.status}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-yellow-400' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs text-gray-300 leading-relaxed italic bg-black/40 p-3 rounded-lg border border-white/5">
                  "{rev.comment}"
                </p>

                {rev.ip && (
                  <p className="text-[10px] text-gray-500">IP: {rev.ip}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-4 border-t border-white/5 mt-4">
                <div className="flex items-center gap-2">
                  {rev.status !== 'approved' && (
                    <button
                      onClick={() => handleUpdateStatus(rev._id, 'approved')}
                      disabled={actionLoading === rev._id}
                      className="px-2.5 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border border-green-500/30"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Approve
                    </button>
                  )}

                  {rev.status !== 'blocked' && (
                    <button
                      onClick={() => handleUpdateStatus(rev._id, 'blocked')}
                      disabled={actionLoading === rev._id}
                      className="px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border border-red-500/30"
                    >
                      <Ban className="w-3.5 h-3.5" />
                      Block
                    </button>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(rev._id)}
                  disabled={actionLoading === rev._id}
                  className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                  title="Permanent Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}