import NewsletterSignup from "@/components/NewsletterSignup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Subscribe to the Seattle Bookstore Newsletter for the latest news, events, and stories from Seattle's independent bookstore community.",
};

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 font-serif text-4xl font-bold text-emerald-900">
          Newsletter
        </h1>
        <p className="text-lg text-gray-600">
          Stay connected with Seattle&apos;s independent bookstore community.
          Get monthly updates on new bookstores, events, author readings, and
          our latest blog posts.
        </p>
      </div>

      <NewsletterSignup />

      <div className="mt-12 rounded-lg bg-gray-50 p-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          What you&apos;ll get
        </h2>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start gap-3">
            <span className="mt-1 text-amber-600">&#10003;</span>
            <span>
              Monthly roundups of bookstore events and author readings
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 text-amber-600">&#10003;</span>
            <span>New bookstore openings and closings</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 text-amber-600">&#10003;</span>
            <span>Curated reading recommendations from local booksellers</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 text-amber-600">&#10003;</span>
            <span>Our latest blog posts and bookstore profiles</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
