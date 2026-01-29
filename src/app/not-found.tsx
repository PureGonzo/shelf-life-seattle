import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-2 text-6xl font-bold text-amber-900">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">
          Page Not Found
        </h2>
        <p className="mb-8 text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-amber-700 px-6 py-2 font-medium text-white transition-colors hover:bg-amber-600"
          >
            Go Home
          </Link>
          <Link
            href="/bookstores"
            className="rounded-lg border border-amber-700 px-6 py-2 font-medium text-amber-700 transition-colors hover:bg-amber-50"
          >
            Browse Bookstores
          </Link>
        </div>
      </div>
    </div>
  );
}
