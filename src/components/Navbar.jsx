import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase.js';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  // Close the mobile menu whenever the user changes page.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  async function handleLogout() {
    try {
      await signOut(auth);
      setMenuOpen(false);
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  function goToSection(sectionId) {
    setMenuOpen(false);

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

  const linkStyle = ({ isActive } = {}) =>
    `text-sm font-medium transition hover:text-teal-700 ${isActive ? 'text-teal-700' : 'text-gray-700'}`;

  const sectionButtonStyle =
    'text-left text-sm font-medium text-gray-700 transition hover:text-teal-700';

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">
      <nav
        className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 md:py-4"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="shrink-0 text-xl font-bold tracking-tight text-teal-700 md:text-2xl"
        >
          DEV@Deakin
        </Link>

        {/* Search bar on tablet/desktop */}
        <form
          onSubmit={(event) => event.preventDefault()}
          className="hidden w-36 shrink-0 items-center sm:flex md:w-48"
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

        {/* Hamburger button: shown on small screens */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 md:hidden"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation-menu"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          {menuOpen ? <FiX size={25} aria-hidden="true" /> : <FiMenu size={25} aria-hidden="true" />}
        </button>

        {/* Navigation menu. On mobile this opens beneath the header. */}
        <div
          id="primary-navigation-menu"
          className={`${menuOpen ? 'flex' : 'hidden'} absolute left-0 top-full w-full flex-col gap-4 border-b border-gray-200 bg-white px-5 py-5 shadow-lg md:static md:flex md:w-auto md:flex-row md:items-center md:gap-5 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {/* Search bar in the expanded mobile menu */}
          <form
            onSubmit={(event) => event.preventDefault()}
            className="flex w-full items-center sm:hidden"
          >
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search..."
              aria-label="Search"
              className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            />
          </form>

          <NavLink to="/" end className={linkStyle} onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>

          {user && (
            <>
              <button type="button" onClick={() => goToSection('about')} className={sectionButtonStyle}>
                About
              </button>
              <button type="button" onClick={() => goToSection('work')} className={sectionButtonStyle}>
                Work
              </button>
              <button type="button" onClick={() => goToSection('gallery')} className={sectionButtonStyle}>
                Gallery
              </button>
              <button type="button" onClick={() => goToSection('contact')} className={sectionButtonStyle}>
                Contact
              </button>
            </>
          )}

          {/* Post is currently a visual placeholder, as in the original project. */}
          <button type="button" onClick={() => setMenuOpen(false)} className={sectionButtonStyle}>
            Post
          </button>

          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-lg bg-teal-700 px-4 py-2 text-left text-sm font-semibold text-white transition hover:bg-teal-800 md:w-auto md:text-center"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className={linkStyle} onClick={() => setMenuOpen(false)}>
                Login
              </NavLink>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="inline-flex justify-center rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
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
