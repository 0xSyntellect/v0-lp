'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image'; 

export default function LoginPage() {
  const { signIn, signInWithGoogle } = useAuth();
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
      // TODO: redirect on success
    } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Login failed';
    setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    try {
      await signInWithGoogle();
      // will redirect to Google and back
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl mb-4">Log In</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}

      <button
        onClick={handleGoogle}
        className="w-full mb-4 border border-gray-300 p-2 rounded flex items-center justify-center"
      >
        <Image
          src="/google-logo.png"
          alt="Google"
          width={20}
          height={20}
          className="mr-2"
        />
        Sign in with Google
      </button>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="block w-full border p-2 rounded mt-1"
          />
        </label>
        <label className="block mb-4">
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="block w-full border p-2 rounded mt-1"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {loading ? 'Logging in…' : 'Log In'}
        </button>
      </form>
    </div>
  );
}
