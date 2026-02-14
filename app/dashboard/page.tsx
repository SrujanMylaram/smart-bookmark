'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import AddBookmark from '../../components/AddBookmark';
import BookmarkList from '../../components/BookmarkList';
import LogoutButton from '../../components/LogoutButton';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        window.location.href = '/';
        return;
      }

      setUser(data.session.user);
      setLoading(false);
    });
  }, []);

  /* ---------- Loading State ---------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  /* ---------- No User (Safety Redirect) ---------- */
  if (!user) {
    window.location.href = '/';
    return null;
  }

  /* ---------- Dashboard UI ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              My Bookmarks
            </h1>
            <p className="text-sm text-gray-500">
              Save and manage your links
            </p>
          </div>
          <LogoutButton />
        </div>

        {/* Add Bookmark */}
        <div className="mb-6">
          <AddBookmark userId={user.id} />
        </div>

        {/* Bookmark List */}
        <BookmarkList />
      </div>
    </div>
  );
}
