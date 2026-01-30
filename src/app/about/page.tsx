import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Shelf Life Seattle and the person behind this celebration of Seattle's independent bookstore community.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-4xl font-bold text-emerald-900">
        About Shelf Life Seattle
      </h1>

      <div className="prose prose-lg max-w-none prose-headings:text-emerald-900 prose-a:text-emerald-700">
        <p className="text-gray-700">
          Shelf Life Seattle is a love letter to the independent bookstores that
          make this city one of the best places in the world to be a reader.
          From cozy neighborhood shops to radical collectives, from poetry-only
          emporiums to cookbook havens, Seattle&apos;s bookstore scene is as
          diverse and vibrant as the city itself.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">About Me</h2>
        <p className="text-gray-700">
          {/* Replace this with your own bio */}
          Hi, I&apos;m the person behind Shelf Life Seattle. Add your story
          here &mdash; who you are, why you love Seattle&apos;s bookstores, and
          what inspired you to create this site.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">The Mission</h2>
        <p className="text-gray-700">
          This site exists to help people discover and support the independent
          bookstores that give Seattle its literary soul. Whether you&apos;re a
          lifelong local or just visiting, we hope you&apos;ll find your next
          favorite shop here.
        </p>
      </div>
    </div>
  );
}
