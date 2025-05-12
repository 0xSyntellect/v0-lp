'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { signIn, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      router.push('/');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push('/');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Google sign-in failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Welcome Back
        </h1>
        {error && (
          <div className="bg-red-800 text-red-300 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="flex items-center justify-center w-full mb-6 border border-[#D4AF37] text-[#D4AF37] py-3 rounded-lg font-semibold transition hover:bg-[#D4AF37] hover:text-black disabled:opacity-50"
        >
          <Image
            src="/google-logo.png"
            alt="Google"
            width={20}
            height={20}
            className="mr-3"
          />
          Sign in with Google
        </button>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-sm uppercase text-gray-400">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="mt-1 block w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded py-2 px-3 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            />
          </label>
          <label className="block mb-6">
            <span className="text-sm uppercase text-gray-400">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="mt-1 block w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded py-2 px-3 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4AF37] text-black py-3 rounded-lg font-semibold transition hover:bg-opacity-90 disabled:opacity-50"
          >
            {loading ? 'Logging in…' : 'Log In'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{' '}
          <a href="/signup" className="text-[#D4AF37] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}