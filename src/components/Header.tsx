"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-emerald-900 text-stone-50 shadow-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label="books">
              📚
            </span>
            <span className="font-serif text-lg font-bold tracking-tight">
              Shelf Life Seattle
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <Link
              href="/"
              className="text-stone-200 transition-colors hover:text-white"
            >
              Map
            </Link>
            <Link
              href="/bookstores"
              className="text-stone-200 transition-colors hover:text-white"
            >
              Bookstores
            </Link>
            <Link
              href="/blog"
              className="text-stone-200 transition-colors hover:text-white"
            >
              Blog
            </Link>
            <Link
              href="/newsletter"
              className="text-stone-200 transition-colors hover:text-white"
            >
              Newsletter
            </Link>
            <Link
              href="/about"
              className="text-stone-200 transition-colors hover:text-white"
            >
              About
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="border-t border-emerald-800 pb-4 md:hidden">
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/"
                className="rounded px-3 py-2 text-stone-200 transition-colors hover:bg-emerald-800 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                Map
              </Link>
              <Link
                href="/bookstores"
                className="rounded px-3 py-2 text-stone-200 transition-colors hover:bg-emerald-800 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                Bookstores
              </Link>
              <Link
                href="/blog"
                className="rounded px-3 py-2 text-stone-200 transition-colors hover:bg-emerald-800 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/newsletter"
                className="rounded px-3 py-2 text-stone-200 transition-colors hover:bg-emerald-800 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                Newsletter
              </Link>
              <Link
                href="/about"
                className="rounded px-3 py-2 text-stone-200 transition-colors hover:bg-emerald-800 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
