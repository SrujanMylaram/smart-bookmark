'use client';
import { supabase } from '../lib/supabaseClient';

export default function LogoutButton() {
  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <button
      onClick={logout}
      className="flex items-center gap-2 text-sm font-medium
                 text-red-600 border border-red-200
                 px-3 py-1.5 rounded-md
                 hover:bg-red-50 hover:text-red-700
                 transition focus:outline-none focus:ring-2 focus:ring-red-300"
    >
      {/* Icon */}
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
        />
      </svg>

      Logout
    </button>
  );
}

