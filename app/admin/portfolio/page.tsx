import cloudinary from '@/lib/cloudinary';
import ImageUpload from '@/components/admin/ImageUpload';
import Image from 'next/image';
import { Trash2, Edit, Plus, ImageIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
  let images: any[] = [];

  try {
    const result = await cloudinary.search
      .expression('folder:karachi-tailors/portfolio/*')
      .sort_by('created_at', 'desc')
      .max_results(50)
      .execute();

    images = result.resources || [];
  } catch (err) {
    console.error('Cloudinary search error:', err);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-white mb-2">
          Portfolio <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">Gallery</span>
        </h1>
        <p className="text-gray-400 text-sm">
          Manage, upload, and curate luxury bridal wear and formal collections
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-[#111] border border-yellow-600/20 rounded-2xl p-6">
        <h2 className="font-serif text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-yellow-400" />
          Upload New Dress Design
        </h2>
        <ImageUpload />
      </div>

      {/* Images Grid */}
      <div className="bg-[#111] border border-yellow-600/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-lg font-bold text-white">
            Active Portfolio Items ({images.length})
          </h2>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <ImageIcon className="w-16 h-16 mx-auto mb-3 opacity-30 text-yellow-400" />
            <p className="text-sm">No portfolio images uploaded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image: any) => (
              <div
                key={image.public_id}
                className="group relative bg-black/60 rounded-xl overflow-hidden border border-yellow-600/20 hover:border-yellow-500/50 transition-all duration-300"
              >
                <div className="relative aspect-[3/4] w-full bg-black/40">
                  <Image
                    src={image.secure_url}
                    alt={image.public_id}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <form action="/api/admin/images/delete" method="POST">
                      <input type="hidden" name="public_id" value={image.public_id} />
                      <button
                        type="submit"
                        aria-label="Delete image"
                        className="w-10 h-10 bg-red-600/80 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition shadow-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>

                {/* Metadata */}
                <div className="p-4 border-t border-yellow-600/10">
                  <p className="text-xs text-yellow-400 font-medium truncate">
                    {image.public_id.split('/').pop()}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Uploaded: {new Date(image.created_at).toLocaleDateString('en-PK')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}