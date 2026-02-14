'use client';
import { supabase } from '../lib/supabaseClient';

export default function LoginPage() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        
        {/* App Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Smart Bookmark App
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Save and manage your bookmarks securely
        </p>

        {/* Google Sign-in Button */}
        <button
          onClick={login}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 font-medium text-gray-700 hover:bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          {/* Google Icon */}
          <svg
            className="w-5 h-5"
            viewBox="0 0 48 48"
          >
            <path fill="#EA4335" d="M24 9.5c3.06 0 5.81 1.05 7.98 2.78l5.94-5.94C34.1 2.38 29.41 0 24 0 14.62 0 6.48 5.38 2.56 13.22l6.92 5.37C11.27 13.19 17.16 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24c0-1.64-.15-3.21-.43-4.74H24v9.01h12.7c-.55 2.96-2.2 5.46-4.7 7.15l7.19 5.58C43.9 36.66 46.5 30.8 46.5 24z"/>
            <path fill="#FBBC05" d="M9.48 28.59c-.48-1.45-.76-2.99-.76-4.59s.28-3.14.76-4.59l-6.92-5.37C.92 17.36 0 20.57 0 24s.92 6.64 2.56 9.96l6.92-5.37z"/>
            <path fill="#34A853" d="M24 48c6.41 0 11.8-2.11 15.74-5.72l-7.19-5.58c-2 1.35-4.56 2.15-8.55 2.15-6.84 0-12.73-3.69-14.52-9.09l-6.92 5.37C6.48 42.62 14.62 48 24 48z"/>
          </svg>

          <span>Sign in with Google</span>
        </button>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-6">
          Authentication powered by Supabase
        </p>
      </div>
    </div>
  );
}
