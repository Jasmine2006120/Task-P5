
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [
    [email, setEmail],
    [password, setPassword],
    [error, setError],
    [loading, setLoading]
  ] = [
    useState(''),
    useState(''),
    useState(''),
    useState(false)
  ];

  const successMessage = location.state?.message;

  async function handleLogin(event) {
    event.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);

      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found'
      ) {
        setError('Incorrect email or password. Please try again.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many attempts. Please wait and try again.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-12">
      <section className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

        {/* Heading */}
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Welcome back
        </h1>

        <p className="mt-2 text-center text-gray-600">
          Sign in to DEV@Deakin.
        </p>

        {/* Success message */}
        {successMessage && (
          <p
            role="status"
            className="mt-5 rounded-md bg-green-50 p-3 text-sm text-green-700"
          >
            {successMessage}
          </p>
        )}

        {/* Login form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="loginEmail"
              className="mb-1 block font-medium text-gray-800"
            >
              Email address
            </label>

            <input
              id="loginEmail"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="loginPassword"
              className="mb-1 block font-medium text-gray-800"
            >
              Password
            </label>

            <input
              id="loginPassword"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Error message */}
          {error && (
            <p
              role="alert"
              className="rounded-md bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {/* Teal Login button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-teal-700 px-4 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Log in'}
          </button>
        </form>

        {/* Registration link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-teal-700 hover:underline"
          >
            Sign up
          </Link>
        </p>

      </section>
    </main>
  );
}
