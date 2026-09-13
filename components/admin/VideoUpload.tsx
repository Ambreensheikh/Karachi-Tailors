'use client';

import { useState } from 'react';
import { Upload, Loader2, X, Check, AlertCircle } from 'lucide-react';

interface VideoUploadProps {
  folder?: string;
}

export default function VideoUpload({ folder = 'videos' }: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File size check (Max 50MB for Cloudinary standard accounts)
    if (file.size > 50 * 1024 * 1024) {
      setError('Video size must be less than 50MB');
      return;
    }

    setError('');
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview(null);
    setError('');
  };

  const handleUpload = async () => {
    if (!selectedFile || !title.trim()) {
      setError('Please provide a video file and title');
      return;
    }

    setUploading(true);
    setSuccess(false);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', title);
      formData.append('folder', folder);

      const response = await fetch('/api/admin/videos/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setSelectedFile(null);
        setPreview(null);
        setTitle('');
        setTimeout(() => {
          setSuccess(false);
          window.location.reload();
        }, 1500);
      } else {
        setError(result.error || 'Failed to upload video');
      }
    } catch (err: any) {
      setError(err.message || 'Network error occurred while uploading.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl">
      {/* File Drop/Picker */}
      <div className="border-2 border-dashed border-yellow-600/30 rounded-xl p-8 text-center hover:border-yellow-400/60 transition bg-black/40">
        <input
          type="file"
          accept="video/mp4,video/webm,video/quicktime"
          onChange={handleFileChange}
          className="hidden"
          id="admin-video-upload"
        />

        <label htmlFor="admin-video-upload" className="cursor-pointer block">
          {preview ? (
            <div className="relative inline-block w-full max-w-sm">
              <video
                src={preview}
                controls
                className="w-full aspect-video object-contain rounded-lg border border-yellow-500/30 bg-black"
              />
              <button
                type="button"
                onClick={handleClear}
                aria-label="Remove video"
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition shadow-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/20">
              <Upload className="w-8 h-8 text-yellow-400" />
            </div>
          )}

          <p className="text-yellow-400 font-medium text-sm mt-3">
            {preview ? 'Change Video Reel' : 'Click to select craftsmanship video'}
          </p>
          <p className="text-gray-500 text-xs mt-1">MP4, WEBM up to 50MB</p>
        </label>
      </div>

      {/* Metadata Form */}
      {preview && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-yellow-400 mb-1">
              Video Title / Description *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Handcrafted Zardozi Stitching Process"
              required
              className="w-full bg-[#181818] border border-yellow-600/30 rounded-lg px-4 py-2.5 text-white text-sm focus:border-yellow-400 outline-none transition"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/30 p-2.5 rounded-lg">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading || !title.trim()}
            className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_25px_rgba(255,215,0,0.6)] disabled:opacity-50 cursor-pointer"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing &amp; Uploading Video...
              </>
            ) : success ? (
              <>
                <Check className="w-4 h-4 text-black" />
                Video Uploaded Successfully!
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload Craftsmanship Video
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}