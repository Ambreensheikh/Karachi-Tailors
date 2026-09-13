'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, Scissors } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const router = useRouter();

  // Check if already logged in
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/me', {
          credentials: 'include',
        });
        const data = await res.json();

        if (data.authenticated) {
          router.replace('/admin/dashboard');
          return;
        }
      } catch (err) {
        // me API agar exist na kare to chup-chap login show kare
      } finally {
        setIsCheckingAuth(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Invalid password');
        return;
      }

      if (data.success) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-yellow-400 font-serif">
        <div className="flex flex-col items-center gap-3">
          <Scissors className="w-8 h-8 animate-spin text-yellow-400" />
          <p className="text-sm tracking-widest uppercase">Loading Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Gold Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.15),transparent_60%)] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <Scissors className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
            <span className="font-serif text-2xl font-bold tracking-wide text-white">
              Karachi{" "}
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                Tailors
              </span>
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-white mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-400 text-sm">
            Enter your secure password to manage portfolio &amp; inquiries
          </p>
        </div>

        {/* Login Form Box */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#111111]/90 backdrop-blur-xl border border-yellow-600/30 rounded-2xl p-8 space-y-6 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
        >
          <div>
            <label className="block text-xs uppercase tracking-wider text-yellow-400 font-semibold mb-2">
              Admin Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full bg-[#181818] border border-yellow-600/30 rounded-lg pl-11 pr-11 py-3 text-white placeholder-gray-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition text-sm"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-xs">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black py-3.5 rounded-lg font-bold uppercase text-xs tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_25px_rgba(255,215,0,0.6)] disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Authenticating...' : 'Login to Dashboard'}
          </button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-6 tracking-wider uppercase">
          Authorized Tailoring Studio Access Only
        </p>
      </div>
    </div>
  );
}