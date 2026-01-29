"use client";

import Link from "next/link";
import NewsletterSignup from "./NewsletterSignup";

export default function Footer() {
  return (
    <footer className="mt-auto bg-amber-900 text-amber-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">
              Shelf Life Seattle
            </h3>
            <p className="text-sm text-amber-200">
              Celebrating Seattle&apos;s independent bookstore community. Discover
              unique shops, read stories, and support local booksellers.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-amber-200 transition-colors hover:text-white"
                >
                  Interactive Map
                </Link>
              </li>
              <li>
                <Link
                  href="/bookstores"
                  className="text-amber-200 transition-colors hover:text-white"
                >
                  All Bookstores
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-amber-200 transition-colors hover:text-white"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/newsletter"
                  className="text-amber-200 transition-colors hover:text-white"
                >
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">
              Stay Updated
            </h3>
            <NewsletterSignup compact />
          </div>
        </div>

        <div className="mt-8 border-t border-amber-800 pt-8 text-center text-sm text-amber-300">
          <p>
            &copy; {new Date().getFullYear()} Shelf Life Seattle. Made with
            love for books.
          </p>
        </div>
      </div>
    </footer>
  );
}
