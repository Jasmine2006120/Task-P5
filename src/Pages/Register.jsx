
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase.js';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
    loading: false,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleRegister(event) {
    event.preventDefault();

    setFormData((previous) => ({
      ...previous,
      error: '',
    }));

    const name = formData.fullName.trim();
    const cleanEmail = formData.email.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (!name || !cleanEmail || !password || !confirmPassword) {
      setFormData((previous) => ({
        ...previous,
        error: 'Please fill in every field.',
      }));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setFormData((previous) => ({
        ...previous,
        error: 'Please enter a valid email address.',
      }));
      return;
    }

    if (password.length < 6) {
      setFormData((previous) => ({
        ...previous,
        error: 'Password must contain at least 6 characters.',
      }));
      return;
    }

    if (password !== confirmPassword) {
      setFormData((previous) => ({
        ...previous,
        error: 'Passwords do not match.',
      }));
      return;
    }

    setFormData((previous) => ({
      ...previous,
      loading: true,
    }));

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        cleanEmail,
        password
      );

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        fullName: name,
        email: cleanEmail,
        createdAt: serverTimestamp(),
      });

      navigate('/login', {
        state: {
          message: 'Account created successfully. Please log in.',
        },
      });
    } catch (err) {
      console.error(err);

      let errorMessage;

      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please log in.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Please choose a stronger password.';
      } else if (
        err.code === 'permission-denied' ||
        err.code === 'firestore/permission-denied'
      ) {
        errorMessage =
          'Your account may have been created, but saving your profile was denied. Check your Firestore security rules.';
      } else {
        errorMessage =
          err.message || 'Registration failed. Please try again.';
      }

      setFormData((previous) => ({
        ...previous,
        error: errorMessage,
      }));
    } finally {
      setFormData((previous) => ({
        ...previous,
        loading: false,
      }));
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-12">
      <section className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Create your account
        </h1>

        <p className="mt-2 text-center text-gray-600">
          Join the DEV@Deakin community.
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">
          {/* Full name */}
          <div>
            <label
              htmlFor="fullName"
              className="mb-1 block font-medium text-gray-800"
            >
              Full name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block font-medium text-gray-800"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block font-medium text-gray-800"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600"
              placeholder="At least 6 characters"
              required
            />
          </div>

          {/* Confirm password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block font-medium text-gray-800"
            >
              Confirm password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600"
              placeholder="Re-enter your password"
              required
            />
          </div>

          {/* Error message */}
          {formData.error && (
            <p
              role="alert"
              className="rounded-md bg-red-50 p-3 text-sm text-red-700"
            >
              {formData.error}
            </p>
          )}

          {/* Teal signup button */}
          <button
            type="submit"
            disabled={formData.loading}
            className="w-full rounded-md bg-teal-700 px-4 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {formData.loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-teal-700 hover:underline"
          >
            Log in
          </Link>
        </p>
      </section>
    </main>
  );
}
