import { fetchCurrentlyReading } from "@/lib/goodreads";

export default async function CurrentlyReading() {
  const currentReads = await fetchCurrentlyReading();

  if (currentReads.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="mb-6 font-serif text-2xl font-bold text-emerald-900">
        What I&apos;m Reading
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentReads.map((read) => (
          <a
            key={read.title}
            href={read.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="flex h-full gap-4 rounded-lg border border-amber-200 bg-amber-50 shadow-sm p-4 transition-all hover:border-amber-300 hover:shadow-md">
              {read.coverUrl && (
                <img
                  src={read.coverUrl}
                  alt={`Cover of ${read.title}`}
                  className="w-[80px] shrink-0 self-start rounded object-cover"
                />
              )}
              <div className="min-w-0">
                <h3 className="break-words font-semibold text-gray-900">
                  {read.title}
                </h3>
                <p className="text-sm text-gray-500">by {read.author}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
