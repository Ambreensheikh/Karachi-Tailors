import cloudinary from '@/lib/cloudinary';
import VideoUpload from '@/components/admin/VideoUpload';
import { Trash2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getVideos() {
  try {
    const result = await cloudinary.search
      .expression('resource_type:video AND folder:karachi-tailors/videos')
      .sort_by('created_at', 'desc')
      .max_results(30)
      .execute();

    return result.resources || [];
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export default async function AdminVideosPage() {
  const videos = await getVideos();

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-yellow-400">Craftsmanship Videos</h1>
        <p className="text-sm text-gray-400 mt-1">
          Upload and manage atelier tailoring craftsmanship showcase reels
        </p>
      </div>

      {/* Video Upload Box */}
      <div className="bg-[#121212] border border-yellow-600/20 rounded-xl p-6">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-yellow-500 mb-4">
          Upload New Video
        </h2>
        <VideoUpload />
      </div>

      {/* Videos List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">
          Active Videos ({videos.length})
        </h2>

        {videos.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No craftsmanship videos uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((vid: any) => (
              <div
                key={vid.public_id}
                className="bg-[#181818] border border-yellow-600/20 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between"
              >
                <div className="relative aspect-video bg-black">
                  <video
                    src={vid.secure_url}
                    controls
                    className="w-full h-full object-cover"
                    preload="metadata"
                  />
                </div>

                <div className="p-4 flex items-center justify-between gap-2">
                  <div className="truncate">
                    <p className="text-white text-sm font-medium truncate">
                      {vid.context?.custom?.title || vid.filename || 'Craftsmanship Video'}
                    </p>
                    <p className="text-xs text-gray-400">
                      Duration: {vid.duration ? `${Math.round(vid.duration)}s` : 'N/A'}
                    </p>
                  </div>

                  <form action="/api/admin/videos/delete" method="POST">
                    <input type="hidden" name="public_id" value={vid.public_id} />
                    <button
                      type="submit"
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
                      title="Delete Video"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}