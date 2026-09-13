'use client';

import { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ReviewItem {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  service?: string;
  createdAt: string;
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    service: 'Bridal Wear',
    comment: '',
  });

  const fetchApprovedReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (data.success) {
        setReviews(data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch reviews', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMsg({ type: 'success', text: data.message || 'Review submitted successfully!' });
        setFormData({ name: '', rating: 5, service: 'Bridal Wear', comment: '' });
        setTimeout(() => setShowForm(false), 2500);
        fetchApprovedReviews();
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'Failed to submit review.' });
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Network error occurred.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-20 bg-black/60 border-t border-yellow-600/20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Title & Action Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-yellow-500 font-bold">Client Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-2">
              Patron <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">Experiences</span>
            </h2>
            <p className="text-gray-400 text-sm mt-2 max-w-lg">
              Read verified client reviews on bespoke craftsmanship, fitting precision, and bridal couture.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer self-start md:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4" />
            {showForm ? 'Close Form' : 'Write a Review'}
          </button>
        </div>

        {/* Review Form Drawer/Modal */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-[#121212] border border-yellow-600/30 rounded-2xl p-6 md:p-8 max-w-xl mx-auto space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-yellow-400">Share Your Experience</h3>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1">Your Rating *</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="p-1 cursor-pointer transition transform hover:scale-110"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= formData.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs text-yellow-400/80 font-medium ml-2">{formData.rating} out of 5 Stars</span>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1">Your Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Ayesha Khan"
                className="w-full bg-black/60 border border-yellow-600/30 rounded-lg px-4 py-2.5 text-white text-sm focus:border-yellow-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1">Service Tailored</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-black/60 border border-yellow-600/30 rounded-lg px-4 py-2.5 text-white text-sm focus:border-yellow-400 outline-none"
              >
                <option value="Bridal Wear">Bridal Wear</option>
                <option value="Party Wear">Party Wear</option>
                <option value="Modern Wear">Modern Wear</option>
                <option value="Saari Blouse">Saari Blouse</option>
                <option value="Alterations & Fitting">Alterations &amp; Fitting</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1">Your Feedback (Min 10 characters) *</label>
              <textarea
                required
                rows={3}
                minLength={10}
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                placeholder="Describe your fitting, stitching quality, and experience..."
                className="w-full bg-black/60 border border-yellow-600/30 rounded-lg px-4 py-2.5 text-white text-sm focus:border-yellow-400 outline-none"
              />
            </div>

            {statusMsg && (
              <div
                className={`flex items-center gap-2 text-xs p-3 rounded-lg border ${
                  statusMsg.type === 'success'
                    ? 'bg-green-500/10 border-green-500/30 text-green-400'
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}
              >
                {statusMsg.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                <span>{statusMsg.text}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || formData.comment.trim().length < 10}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-90 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit Review'}
            </button>
          </form>
        )}

        {/* Display Reviews Cards */}
        {loading ? (
          <div className="flex items-center justify-center py-12 text-yellow-500 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading verified experiences...</span>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 border border-yellow-600/20 rounded-2xl bg-[#121212]/50">
            <p className="text-gray-400 text-sm">No reviews published yet. Be the first patron to share feedback!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev._id}
                className="bg-[#121212] border border-yellow-600/20 rounded-2xl p-6 flex flex-col justify-between hover:border-yellow-500/40 transition shadow-lg"
              >
                <div className="space-y-3">
                  {/* Stars Display */}
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-300 text-sm italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 mt-4">
                  <h4 className="text-white font-semibold text-sm">{rev.name}</h4>
                  <p className="text-[11px] text-yellow-500/80">{rev.service}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}