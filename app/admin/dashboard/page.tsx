import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import {
  ImageIcon,
  Video,
  TrendingUp,
  MessageSquare,
  Upload,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let imageCount = 0;
  let videoCount = 0;

  try {
    const [images, videos] = await Promise.all([
      cloudinary.search
        .expression("folder:karachi-tailors/portfolio/*")
        .max_results(100)
        .execute(),
      cloudinary.search
        .expression("folder:karachi-tailors/videos/*")
        .max_results(100)
        .execute(),
    ]);

    imageCount = images.total_count || 0;
    videoCount = videos.total_count || 0;
  } catch (err) {
    console.error("Cloudinary error:", err);
  }

  let totalInquiries = 0;
  try {
    await connectDB();
    totalInquiries = await Inquiry.countDocuments();
  } catch (err) {
    console.error("DB error:", err);
  }

  const stats = [
    {
      label: "Portfolio Images",
      value: imageCount,
      icon: ImageIcon,
      link: "/admin/portfolio",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-600/30",
    },
    {
      label: "Craftsmanship Videos",
      value: videoCount,
      icon: Video,
      link: "/admin/videos",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      label: "Client Inquiries",
      value: totalInquiries,
      icon: MessageSquare,
      link: "/admin/inquiries",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      label: "Monthly Inquiries Growth",
      value: "+15%",
      icon: TrendingUp,
      link: "#",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-wide">
          Studio <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">Overview</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Welcome to Karachi Tailors Admin Management Portal
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link
              key={i}
              href={stat.link}
              className={`bg-[#111] border ${stat.border} rounded-2xl p-6 hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(255,215,0,0.1)] transition-all group`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-yellow-400 transition" />
              </div>

              <h3 className="text-3xl font-serif font-bold text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-400 text-xs uppercase tracking-wider">
                {stat.label}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-[#111] border border-yellow-600/20 rounded-2xl p-6">
        <h2 className="font-serif text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Upload className="w-4 h-4 text-yellow-400" /> Quick Management
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/portfolio"
            className="flex items-center justify-between p-4 bg-black/50 border border-yellow-600/10 rounded-xl hover:border-yellow-500/40 hover:bg-black transition group"
          >
            <div>
              <p className="font-semibold text-white text-sm group-hover:text-yellow-400 transition">Upload New Dress</p>
              <p className="text-xs text-gray-500 mt-0.5">Add bridal or formal attire</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-yellow-400" />
          </Link>

          <Link
            href="/admin/videos"
            className="flex items-center justify-between p-4 bg-black/50 border border-yellow-600/10 rounded-xl hover:border-yellow-500/40 hover:bg-black transition group"
          >
            <div>
              <p className="font-semibold text-white text-sm group-hover:text-yellow-400 transition">Add Video</p>
              <p className="text-xs text-gray-500 mt-0.5">Showcase studio craftsmanship</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-yellow-400" />
          </Link>

          <Link
            href="/admin/inquiries"
            className="flex items-center justify-between p-4 bg-black/50 border border-yellow-600/10 rounded-xl hover:border-yellow-500/40 hover:bg-black transition group"
          >
            <div>
              <p className="font-semibold text-white text-sm group-hover:text-yellow-400 transition">Customer Orders</p>
              <p className="text-xs text-gray-500 mt-0.5">View customer design references</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-yellow-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}