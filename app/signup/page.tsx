'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const { signUp, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signUp(email, password);
      setSuccess(
        'Registration successful! Please check your email to confirm your account.'
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
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

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md shadow-2xl text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Thank You!</h1>
          <p className="text-gray-300 mb-6">{success}</p>
          <Link
            href="/login"
            className="inline-block bg-[#D4AF37] text-black py-2 px-6 rounded-lg font-semibold transition hover:bg-opacity-90"
          >
            Go to Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Create Account
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
          Sign up with Google
        </button>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-700" />
          <span className="mx-2 text-gray-500 uppercase text-xs">or</span>
          <hr className="flex-grow border-gray-700" />
        </div>
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
            {loading ? 'Signing up…' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-[#D4AF37] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}