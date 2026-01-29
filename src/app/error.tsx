"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold text-amber-900">
          Something went wrong
        </h1>
        <p className="mb-6 text-gray-600">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-amber-700 px-6 py-2 font-medium text-white transition-colors hover:bg-amber-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
