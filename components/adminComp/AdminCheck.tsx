'use client';

import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useDrop } from '@/lib/context/contextAPI';

const AdminCheck = ({ onClose }: { onClose: () => void }) => {
  const { setIsAdmin } = useDrop();

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const verify = async () => {
    if (!password) return setError('Password required');

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) throw new Error();

      setIsAdmin(true);
      onClose();
    } catch {
      setError('Invalid password');
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[90%] max-w-sm rounded-xl bg-white p-6 shadow-xl">

        {/* Close */}
        <FiX
          className="absolute right-4 top-4 cursor-pointer text-gray-500 hover:text-black"
          onClick={onClose}
        />

        <h2 className="mb-2 text-lg font-semibold text-gray-800">
          Admin Verification
        </h2>

        <p className="mb-4 text-sm text-gray-500">
          Enter admin password to continue
        </p>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && (
          <p className="mb-3 text-sm text-red-500">{error}</p>
        )}

        <button
          onClick={verify}
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </div>
    </div>
  );
};

export default AdminCheck;
