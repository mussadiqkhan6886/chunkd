'use client';

import MediaComp from '@/components/adminComp/MediaComp';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import imageCompression from "browser-image-compression";

const MediaUpload: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const submitMedia = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image || !height) {
      alert('Please select an image and height');
      return;
    }

    setLoading(true);

// Compress images before upload
      const compressedFile = await imageCompression(image, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      });
      
      const formData = new FormData();
      formData.append("img", compressedFile);
    formData.append('height', height);

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      alert('Media uploaded successfully');
      setHeight('');
      setImage(null);
    } catch (error) {
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <main className=" flex gap-5 items-center flex-col justify-center bg-gray-100 px-4">
      <div className='mt-4'>
         <div className="w-full min-w-md bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Add Media
        </h1>

        <form onSubmit={submitMedia} className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-medium
                file:bg-blue-50 file:text-blue-600
                hover:file:bg-blue-100
                cursor-pointer"
            />
          </div>

          {/* Height Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height
            </label>
            <input
              type="number"
              placeholder="e.g. 300"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 text-white py-2
              font-medium transition hover:bg-blue-700
              disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Uploading...' : 'Upload Media'}
          </button>
        </form>
      </div>
      </div>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-2xl font-semibold text-gray-800 text-center mb-6'>Media</h2>
        <MediaComp />
      </div>
    </main>
  );
};

export default MediaUpload;
