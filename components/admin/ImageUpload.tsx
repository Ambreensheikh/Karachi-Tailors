'use client';

import { useState } from 'react';
import { Upload, Loader2, X, Check, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  folder?: string;
}

export default function ImageUpload({ folder = 'portfolio' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [metadata, setMetadata] = useState({
    title: '',
    category: 'Bridal Wear',
    altText: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedFile(null);
    setPreview(null);
    setError('');
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setSuccess(false);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', metadata.title);
      formData.append('category', metadata.category);
      formData.append('altText', metadata.altText);
      formData.append('folder', folder);

      const response = await fetch('/api/admin/images/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setSelectedFile(null);
        setPreview(null);
        setMetadata({ title: '', category: 'Bridal Wear', altText: '' });
        setTimeout(() => {
          setSuccess(false);
          window.location.reload();
        }, 1200);
      } else {
        setError(result.error || 'Upload failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error occurred while uploading.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl">
      {/* File Upload Box */}
      <div className="border-2 border-dashed border-yellow-600/30 rounded-xl p-8 text-center hover:border-yellow-400/60 transition bg-black/40">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="admin-image-upload"
        />

        <label htmlFor="admin-image-upload" className="cursor-pointer block">
          {preview ? (
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Upload Preview"
                className="w-48 h-48 object-cover rounded-lg mx-auto border border-yellow-500/30"
              />
              <button
                type="button"
                onClick={handleClearImage}
                aria-label="Remove image"
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition shadow-md"
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
            {preview ? 'Change Image' : 'Click to select dress image'}
          </p>
          <p className="text-gray-500 text-xs mt-1">PNG, JPG, WEBP up to 10MB</p>
        </label>
      </div>

      {/* Metadata Form */}
      {preview && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-yellow-400 mb-1">
              Dress Title *
            </label>
            <input
              type="text"
              value={metadata.title}
              onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
              className="w-full bg-[#181818] border border-yellow-600/30 rounded-lg px-4 py-2.5 text-white text-sm focus:border-yellow-400 outline-none transition"
              placeholder="e.g., Royal Red Bridal Lehenga"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-yellow-400 mb-1">
              Category *
            </label>
            <select
              value={metadata.category}
              onChange={(e) => setMetadata({ ...metadata, category: e.target.value })}
              className="w-full bg-[#181818] border border-yellow-600/30 rounded-lg px-4 py-2.5 text-white text-sm focus:border-yellow-400 outline-none transition"
            >
              <option value="Bridal Wear">Bridal Wear</option>
              <option value="Party Wear">Party Wear</option>
              <option value="Modern Wear">Modern Wear</option>
              <option value="SaariBlouse">SaariBlouse</option>
              <option value="Alterations">Alterations</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-yellow-400 mb-1">
              Alt Text (Crucial for Google Ranking) *
            </label>
            <input
              type="text"
              value={metadata.altText}
              onChange={(e) => setMetadata({ ...metadata, altText: e.target.value })}
              className="w-full bg-[#181818] border border-yellow-600/30 rounded-lg px-4 py-2.5 text-white text-sm focus:border-yellow-400 outline-none transition"
              placeholder="e.g., Red Bridal Lehenga with Gold Zardozi Embroidery Islamabad"
              required
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
            disabled={uploading || !metadata.title.trim() || !metadata.altText.trim()}
            className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_25px_rgba(255,215,0,0.6)] disabled:opacity-50 cursor-pointer"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading to Cloudinary &amp; Database...
              </>
            ) : success ? (
              <>
                <Check className="w-4 h-4 text-black" />
                Published Successfully!
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Publish to Gallery
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}