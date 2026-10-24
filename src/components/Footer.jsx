
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-teal-700 px-4 py-8 text-white sm:px-6 md:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 sm:gap-8 md:flex-row md:items-center">

        {/* Website description */}
        <div className="w-full text-center md:w-auto md:text-left">
          <h3 className="text-lg font-semibold sm:text-xl">
            DEV@Deakin
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-teal-100 md:mx-0">
            A community for developers and learners.
          </p>
        </div>

        {/* Social media icons */}
        <div className="flex items-center justify-center gap-6 sm:gap-8">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="rounded-full p-2 transition duration-200 hover:scale-110 hover:bg-teal-600 hover:text-teal-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <FaInstagram className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="rounded-full p-2 transition duration-200 hover:scale-110 hover:bg-teal-600 hover:text-teal-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <FaFacebookF className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>

          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="rounded-full p-2 transition duration-200 hover:scale-110 hover:bg-teal-600 hover:text-teal-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <FaTwitter className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto mt-6 w-full max-w-6xl border-t border-teal-600 pt-4 text-center sm:mt-8">
        <p className="text-xs leading-5 text-teal-100 sm:text-sm">
          © {new Date().getFullYear()} DEV@Deakin. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
