
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase.js';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  function goToSection(sectionId) {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;

      const timeoutId = setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        navigate('/', { replace: true, state: {} });
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [location, navigate]);

  const linkStyle =
    'text-sm font-medium text-gray-700 transition hover:text-teal-700';

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="shrink-0 text-xl font-bold tracking-tight text-teal-700 md:text-2xl"
        >
          DEV@Deakin
        </Link>

        {/* Smaller search bar - UI only */}
        <form
          onSubmit={(event) => event.preventDefault()}
          className="flex w-36 shrink-0 items-center sm:w-44 md:w-48"
        >
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search..."
            aria-label="Search"
            className="h-9 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
          />
        </form>

        {/* Navigation links */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <NavLink to="/" className={linkStyle}>
            Home
          </NavLink>

          {user && (
            <>
              <button
                onClick={() => goToSection('about')}
                className={linkStyle}
              >
                About
              </button>

              <button
                onClick={() => goToSection('work')}
                className={linkStyle}
              >
                Work
              </button>

              <button
                onClick={() => goToSection('gallery')}
                className={linkStyle}
              >
                Gallery
              </button>

              <button
                onClick={() => goToSection('contact')}
                className={linkStyle}
              >
                Contact
              </button>
            </>
          )}

          {/* Post option - UI only */}
          <button
            type="button"
            onClick={() => {}}
            className={linkStyle}
          >
            Post
          </button>

          {/* Authentication options */}
          {user ? (
            <button
              onClick={handleLogout}
              className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className={linkStyle}>
                Login
              </NavLink>

              <Link
                to="/register"
                className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
