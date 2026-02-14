'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AddBookmark({ userId }: { userId: string }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const addBookmark = async () => {
    if (!title || !url || loading) return;

    setLoading(true);

    const { data, error } = await supabase
      .from('bookmarks')
      .insert({ title, url, user_id: userId })
      .select()
      .single();

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setTitle('');
    setUrl('');

    // 🔥 Optimistic UI update
    window.dispatchEvent(
      new CustomEvent('bookmark-added', { detail: data })
    );

    document
      .getElementById('bookmark-list')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-700 mb-3">
        Add New Bookmark
      </h2>

      <div className="flex gap-3 flex-col sm:flex-row">
        <input
          className="border px-3 py-2 rounded text-black"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className="border px-3 py-2 rounded text-black"
          placeholder="https://example.com"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <button
          onClick={addBookmark}
          disabled={loading}
          className="bg-blue-600 text-white px-4 rounded"
        >
          {loading ? 'Adding…' : 'Add'}
        </button>
      </div>
    </div>
  );
}
