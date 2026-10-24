import { useState } from 'react';

import deakinImage from '../assets/deakin.png';
import jasmineImage from '../assets/jasmine.jpeg';

import p1 from '../assets/p1.png';
import p2 from '../assets/p2.png';
import p3 from '../assets/p3.png';
import p4 from '../assets/p4.png';

import i1 from '../assets/i1.jpg';
import i2 from '../assets/i2.jpg';
import i3 from '../assets/i3.jpg';
import i4 from '../assets/i4.jpg';
import i5 from '../assets/i5.jpg';
import i6 from '../assets/i6.jpg';
import i7 from '../assets/i7.jpg';
import i8 from '../assets/i8.jpg';

export default function Home() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAllTutorials, setShowAllTutorials] = useState(false);

  // Projects
  const projects = [
    {
      title: 'Project One',
      description:
        'A project I worked on while learning new technologies.',
      image: p1,
    },
    {
      title: 'Project Two',
      description:
        'An opportunity to practise my development skills.',
      image: p2,
    },
    {
      title: 'Project Three',
      description:
        'A project exploring design and functionality.',
      image: p3,
    },
    {
      title: 'Project Four',
      description:
        'Another project from my learning journey.',
      image: p4,
    },
  ];

  // Tutorials
  const tutorials = [
    {
      title: 'React Components',
      description:
        'Understand how to create reusable React components.',
      image: i1,
      username: 'Jasmine',
      rating: '5.0',
    },
    {
      title: 'Responsive Web Design',
      description:
        'Learn how to make websites work on different screen sizes.',
      image: i2,
      username: 'Jasmine',
      rating: '4.9',
    },
    {
      title: 'React Hooks',
      description:
        'Explore how React Hooks help manage state and behaviour.',
      image: i3,
      username: 'Jasmine',
      rating: '4.9',
    },
    {
      title: 'JavaScript Basics',
      description:
        'Practise variables, functions and essential JavaScript concepts.',
      image: i4,
      username: 'Jasmine',
      rating: '4.8',
    },
    {
      title: 'Building with Tailwind CSS',
      description:
        'Learn to style web pages using utility classes.',
      image: i5,
      username: 'Jasmine',
      rating: '4.9',
    },
    {
      title: 'Getting Started with Firebase',
      description:
        'Discover how Firebase can support authentication and data storage.',
      image: i6,
      username: 'Jasmine',
      rating: '5.0',
    },
  ];

  // Gallery
  const galleryImages = [
    i1, i2, i3, i4, i5, i6, i7, i8,
  ];

  // Newsletter subscription
  async function handleSubscribe(e) {
    e.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setMessage('Please enter your email address.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const apiUrl = (
        import.meta.env.VITE_API_URL ||
        'http://localhost:3000'
      ).replace(/\/$/, '');

      const response = await fetch(`${apiUrl}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: normalizedEmail,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || 'Subscription failed. Please try again.'
        );
      }

      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setMessage(
        error.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-white text-gray-800">

      {/* Hero Section */}
      <section className="px-4 py-8">
        <div className="group relative mx-auto max-w-5xl overflow-hidden rounded-md">
          <img
            src={deakinImage}
            alt="Deakin University"
            className="h-[350px] w-full object-cover md:h-[450px]"
          />

          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/60 px-4 py-5 text-center transition-transform duration-300 group-hover:translate-y-0 group-focus-within:translate-y-0">
            <p className="text-xl font-medium text-white md:text-3xl">
              Hey, I am Jasmine.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <img
            src={jasmineImage}
            alt="Jasmine"
            className="mx-auto mb-6 h-48 w-40 rounded-[50%] object-cover object-top"
          />

          <h2 className="text-3xl font-semibold text-gray-900">
            Hi, I'm Jasmine!
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            I am a student interested in technology, web development
            and learning new things. I enjoy working on projects that
            help me improve my skills and turn ideas into something useful.
          </p>

          <a
            href="#work"
            className="mt-6 inline-block rounded-md bg-teal-600 px-6 py-3 text-white transition hover:bg-teal-700"
          >
            View My Work
          </a>
        </div>
      </section>

      {/* Featured Tutorials Section */}
      <section id="tutorials" className="bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-3 text-center text-3xl font-semibold text-gray-900">
            Featured Tutorials
          </h2>

          <p className="mb-10 text-center text-gray-600">
            Tutorials to help you learn web development and React.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(showAllTutorials
              ? tutorials
              : tutorials.slice(0, 3)
            ).map((tutorial) => (
              <article
                key={tutorial.title}
                className="overflow-hidden rounded-md border border-gray-200 bg-white transition hover:shadow-md"
              >
                <img
                  src={tutorial.image}
                  alt={tutorial.title}
                  loading="lazy"
                  className="h-48 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {tutorial.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {tutorial.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 text-sm">
                    <span className="text-gray-600">
                      By {tutorial.username}
                    </span>

                    <span className="font-medium text-teal-700">
                      ★ {tutorial.rating}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() =>
                setShowAllTutorials((previous) => !previous)
              }
              className="rounded-md bg-teal-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-teal-800"
            >
              {showAllTutorials
                ? 'Show fewer tutorials'
                : 'See all tutorials'}
            </button>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-3 text-center text-3xl font-semibold text-gray-900">
            My Work
          </h2>

          <p className="mb-10 text-center text-gray-600">
            A few projects from my learning journey.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <article
                key={project.title}
                className="overflow-hidden rounded-md border border-gray-200 bg-white transition hover:shadow-md"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-48 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {project.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-3 text-center text-3xl font-semibold text-gray-900">
            Gallery
          </h2>

          <p className="mb-10 text-center text-gray-600">
            Some moments and things I would like to share.
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {galleryImages.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
                className="h-40 w-full rounded-md object-cover transition duration-300 hover:opacity-80 sm:h-48"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section
        id="subscribe"
        className="border-t border-gray-200 px-4 py-14"
      >
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold text-gray-900">
            Stay in touch
          </h2>

          <p className="mt-3 text-gray-600">
            Subscribe to get updates and hear about what I am working on.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage('');
              }}
              placeholder="Enter your email address"
              required
              className="min-w-0 flex-1 rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-teal-600 px-6 py-3 text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {message && (
            <p
              role="status"
              aria-live="polite"
              className="mt-4 text-sm text-gray-600"
            >
              {message}
            </p>
          )}
        </div>
      </section>

    </main>
  );
}