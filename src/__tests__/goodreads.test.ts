import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchCurrentlyReading } from "@/lib/goodreads";

const SAMPLE_RSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Steve's bookshelf: currently-reading</title>
    <item>
      <title><![CDATA[The Great Gatsby]]></title>
      <author_name>F. Scott Fitzgerald</author_name>
      <book_large_image_url><![CDATA[https://images.gr-assets.com/books/gatsby.jpg]]></book_large_image_url>
      <book_image_url><![CDATA[https://images.gr-assets.com/books/gatsby_sm.jpg]]></book_image_url>
      <link><![CDATA[https://www.goodreads.com/review/show/12345]]></link>
    </item>
    <item>
      <title><![CDATA[1984]]></title>
      <author_name>George Orwell</author_name>
      <book_large_image_url><![CDATA[https://images.gr-assets.com/books/1984.jpg]]></book_large_image_url>
      <book_image_url><![CDATA[https://images.gr-assets.com/books/1984_sm.jpg]]></book_image_url>
      <link><![CDATA[https://www.goodreads.com/review/show/67890]]></link>
    </item>
    <item>
      <title><![CDATA[Dune]]></title>
      <author_name>Frank Herbert</author_name>
      <book_large_image_url><![CDATA[https://images.gr-assets.com/books/dune.jpg]]></book_large_image_url>
      <book_image_url><![CDATA[https://images.gr-assets.com/books/dune_sm.jpg]]></book_image_url>
      <link><![CDATA[https://www.goodreads.com/review/show/11111]]></link>
    </item>
    <item>
      <title><![CDATA[Neuromancer]]></title>
      <author_name>William Gibson</author_name>
      <book_large_image_url><![CDATA[https://images.gr-assets.com/books/neuro.jpg]]></book_large_image_url>
      <book_image_url><![CDATA[https://images.gr-assets.com/books/neuro_sm.jpg]]></book_image_url>
      <link><![CDATA[https://www.goodreads.com/review/show/22222]]></link>
    </item>
  </channel>
</rss>`;

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("fetchCurrentlyReading", () => {
  it("parses RSS feed and returns books", async () => {
    process.env.GOODREADS_USER_ID = "38624595";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(SAMPLE_RSS),
      })
    );

    const books = await fetchCurrentlyReading();

    expect(books).toHaveLength(3);
    expect(books[0]).toEqual({
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      coverUrl: "https://images.gr-assets.com/books/gatsby.jpg",
      linkUrl: "https://www.goodreads.com/review/show/12345",
    });
    expect(books[1].title).toBe("1984");
    expect(books[2].title).toBe("Dune");
  });

  it("returns empty array when GOODREADS_USER_ID is missing", async () => {
    delete process.env.GOODREADS_USER_ID;

    const books = await fetchCurrentlyReading();

    expect(books).toEqual([]);
  });

  it("returns empty array on fetch failure", async () => {
    process.env.GOODREADS_USER_ID = "38624595";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })
    );

    const books = await fetchCurrentlyReading();

    expect(books).toEqual([]);
  });

  it("respects the limit parameter", async () => {
    process.env.GOODREADS_USER_ID = "38624595";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(SAMPLE_RSS),
      })
    );

    const books = await fetchCurrentlyReading(2);

    expect(books).toHaveLength(2);
    expect(books[0].title).toBe("The Great Gatsby");
    expect(books[1].title).toBe("1984");
  });
});
