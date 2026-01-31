export interface GoodreadsBook {
  title: string;
  author: string;
  coverUrl: string;
  linkUrl: string;
}

function extractTag(xml: string, tag: string): string {
  // Handle CDATA-wrapped content: <tag><![CDATA[value]]></tag>
  const cdataRegex = new RegExp(
    `<${tag}>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`
  );
  const cdataMatch = xml.match(cdataRegex);
  if (cdataMatch) return cdataMatch[1].trim();

  // Plain text content: <tag>value</tag>
  const plainRegex = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`);
  const plainMatch = xml.match(plainRegex);
  if (plainMatch) return plainMatch[1].trim();

  return "";
}

export async function fetchCurrentlyReading(
  limit = 3
): Promise<GoodreadsBook[]> {
  const userId = process.env.GOODREADS_USER_ID;
  if (!userId) return [];

  try {
    const url = `https://www.goodreads.com/review/list_rss/${userId}?shelf=currently-reading`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) return [];

    const xml = await res.text();

    const items: GoodreadsBook[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null && items.length < limit) {
      const itemXml = match[1];

      const title = extractTag(itemXml, "title");
      const authorName = extractTag(itemXml, "author_name");
      const link = extractTag(itemXml, "link");

      // Cover image is inside book_large_image_url or book_image_url
      const cover =
        extractTag(itemXml, "book_large_image_url") ||
        extractTag(itemXml, "book_image_url");

      if (title && authorName) {
        items.push({
          title,
          author: authorName,
          coverUrl: cover,
          linkUrl: link,
        });
      }
    }

    return items;
  } catch {
    return [];
  }
}
