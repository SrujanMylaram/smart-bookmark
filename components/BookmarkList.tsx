'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);

  /* ---------- Initial Load ---------- */
  useEffect(() => {
    supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => setBookmarks(data || []));
  }, []);

  /* ---------- Optimistic Add Listener ---------- */
  useEffect(() => {
    const handler = (e: any) => {
      setBookmarks(prev =>
        prev.find(b => b.id === e.detail.id)
          ? prev
          : [e.detail, ...prev]
      );
    };
    window.addEventListener('bookmark-added', handler);
    return () => window.removeEventListener('bookmark-added', handler);
  }, []);

  /* ---------- Realtime Sync (FEATURE 4) ---------- */
  useEffect(() => {
    const channel = supabase
      .channel('bookmarks-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'bookmarks' },
        payload =>
          setBookmarks(prev =>
            prev.find(b => b.id === payload.new.id)
              ? prev
              : [payload.new, ...prev]
          )
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'bookmarks' },
        payload =>
          setBookmarks(prev =>
            prev.filter(b => b.id !== payload.old.id)
          )
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  /* ---------- Optimistic Delete ---------- */
  const deleteBookmark = async (id: string) => {
    if (!confirm('Delete bookmark?')) return;

    const previous = bookmarks;
    setBookmarks(prev => prev.filter(b => b.id !== id));

    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', id);

    if (error) {
      alert(error.message);
      setBookmarks(previous);
    }
  };

  if (bookmarks.length === 0) {
    return (
      <div id="bookmark-list" className="text-center text-gray-500 py-6">
        No bookmarks yet.
      </div>
    );
  }

  const visible = showAll ? bookmarks : bookmarks.slice(0, 5);

  return (
    <div id="bookmark-list">
      <ul className="space-y-3">
        {visible.map(b => (
          <li
            key={b.id}
            className="flex justify-between border p-3 rounded"
          >
            <a href={b.url} target="_blank" className="text-blue-600">
              {b.title}
            </a>
            <button
              onClick={() => deleteBookmark(b.id)}
              className="text-red-500"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {bookmarks.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-blue-600 text-sm mt-4"
        >
          {showAll ? 'Show less' : 'View more'}
        </button>
      )}
    </div>
  );
}
