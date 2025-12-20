'use client';

import { useDrop } from '@/lib/context/contextAPI';
import { MediaType } from '@/type';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import AdminCheck from './AdminCheck';


const MediaComp: React.FC = () => {
  const [media, setMedia] = useState<MediaType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAdminCheck, setShowAdminCheck] = useState(false)
  const {isAdmin, setIsAdmin} = useDrop()

  /* ================= FETCH MEDIA ================= */
  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/media');
      const data = await res.json();
      setMedia(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  /* ================= DELETE MEDIA ================= */
  const deleteMedia = async (id: string) => {
    setIsAdmin(false)

    if(isAdmin){
      if (!confirm('Delete this media?')) return;
    

    setDeletingId(id);

    try {
      const res = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Delete failed');

      setMedia((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      alert('Failed to delete');
    } finally {
      setDeletingId(null);
    }
  }else{
    setShowAdminCheck(true)
  }
  };

  /* ================= UI ================= */
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">Loading media...</div>
    );
  }

  return (
    <section className="p-6">
      <h2 className="text-xl font-semibold mb-4">Media Library</h2>

      {media.length === 0 ? (
        <p className="text-gray-500">No media uploaded yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {media.map((item) => (
            <div
              key={item._id}
              className="relative group rounded-lg overflow-hidden shadow"
            >
              {item.mediaType === "image" ? <Image
                width={300}
                height={300}
                src={item.media}
                alt="media"
                style={{ height: item.height }}
                className="w-full object-cover"
                
              /> : <video
                  src={item.media}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  style={{ height: item.height }}
                  className="w-full object-cover rounded-lg bg-black"
                />}

              {/* DELETE BUTTON */}
              <button
                onClick={() => deleteMedia(item._id)}
                disabled={deletingId === item._id}
                className="absolute top-2 right-2
                  bg-red-600 text-white rounded-full
                  w-7 h-7 flex items-center justify-center
                  text-sm opacity-0 group-hover:opacity-100
                  transition disabled:bg-red-300"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      {showAdminCheck && (
        <AdminCheck onClose={() => setShowAdminCheck(false)} />
      )}
    </section>
  );
};

export default MediaComp;
