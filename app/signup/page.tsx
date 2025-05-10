'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';


export default function SignUpPage() {
  const { signUp } = useAuth();
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
      // Show a confirmation message instead of the form
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

  // If registration succeeded, show a thank-you screen
  if (success) {
    return (
      <div className="max-w-md mx-auto p-4 text-center">
        <h1 className="text-2xl font-semibold mb-4">Thank You!</h1>
        <p className="mb-4">{success}</p>
        <p>
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    );
  }

  // Default: show the sign-up form
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h1 className="text-xl mb-4">Sign Up</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}
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
        {loading ? 'Signing up…' : 'Sign Up'}
      </button>
    </form>
  );
}
