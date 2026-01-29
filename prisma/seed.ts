import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: "file:./prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed bookstores
  const bookstores = [
    {
      name: "Elliott Bay Book Company",
      slug: "elliott-bay-book-company",
      address: "1521 10th Ave, Seattle, WA 98122",
      neighborhood: "Capitol Hill",
      lat: 47.6143,
      lng: -122.3194,
      description:
        "A beloved Seattle institution since 1973, Elliott Bay Book Company is one of the largest independent bookstores in the Pacific Northwest. With over 150,000 titles across multiple floors, a renowned reading series, and a cozy basement cafe, it's a literary landmark on Capitol Hill.",
      websiteUrl: "https://www.elliottbaybook.com",
      hours: "Mon-Sun 10am-9pm",
      specialty: "General / Literary Fiction",
    },
    {
      name: "Third Place Books - Lake Forest Park",
      slug: "third-place-books-lake-forest-park",
      address: "17171 Bothell Way NE, Lake Forest Park, WA 98155",
      neighborhood: "Lake Forest Park",
      lat: 47.7562,
      lng: -122.2812,
      description:
        "The flagship location of Third Place Books, nestled in the Town Center at Lake Forest Park. Known for its community-focused atmosphere, extensive used book section, and integration with restaurants and shops in the mall.",
      websiteUrl: "https://www.thirdplacebooks.com",
      hours: "Mon-Sun 9am-9pm",
      specialty: "General / Community",
    },
    {
      name: "Third Place Books - Seward Park",
      slug: "third-place-books-seward-park",
      address: "5041 Wilson Ave S, Seattle, WA 98118",
      neighborhood: "Seward Park",
      lat: 47.5564,
      lng: -122.2663,
      description:
        "A neighborhood bookstore in the Seward Park area, Third Place Books Seward Park offers a carefully curated selection of new books, a cozy reading environment, and regular community events.",
      websiteUrl: "https://www.thirdplacebooks.com",
      hours: "Mon-Sun 9am-8pm",
      specialty: "General / Community",
    },
    {
      name: "Ada's Technical Books & Cafe",
      slug: "adas-technical-books",
      address: "425 15th Ave E, Seattle, WA 98112",
      neighborhood: "Capitol Hill",
      lat: 47.6229,
      lng: -122.3127,
      description:
        "A unique bookstore specializing in science, technology, engineering, math, and design (STEMD) books. Ada's combines a curated technical bookshop with a full-service cafe, creating a haven for curious minds and makers on Capitol Hill.",
      websiteUrl: "https://www.adasbooks.com",
      hours: "Mon-Fri 8am-8pm, Sat-Sun 9am-8pm",
      specialty: "Science / Technology / Engineering",
    },
    {
      name: "Left Bank Books",
      slug: "left-bank-books",
      address: "92 Pike St, Seattle, WA 98101",
      neighborhood: "Pike Place Market",
      lat: 47.6087,
      lng: -122.3405,
      description:
        "An all-volunteer, collectively run anarchist bookstore located in Pike Place Market since 1973. Left Bank Books focuses on radical politics, social justice, and countercultural literature. One of the oldest collectively run bookstores in the country.",
      websiteUrl: "https://www.leftbankbooks.com",
      hours: "Mon-Sun 11am-6pm",
      specialty: "Political / Anarchist / Social Justice",
    },
    {
      name: "Magus Books",
      slug: "magus-books",
      address: "1408 NE 42nd St, Seattle, WA 98105",
      neighborhood: "University District",
      lat: 47.6589,
      lng: -122.3107,
      description:
        "A treasure trove of used books in the heart of the University District. Magus Books has been serving the academic community and book lovers since 1979, with a deep selection of scholarly works, literature, and rare finds.",
      websiteUrl: "https://www.magusbooks.com",
      hours: "Mon-Sun 10am-8pm",
      specialty: "Used / Academic / Scholarly",
    },
    {
      name: "Arundel Books",
      slug: "arundel-books",
      address: "312 1st Ave S, Seattle, WA 98104",
      neighborhood: "Pioneer Square",
      lat: 47.5993,
      lng: -122.3340,
      description:
        "A Pioneer Square institution specializing in rare, antiquarian, and fine used books. Arundel Books offers a carefully curated collection across many subjects, with particular strengths in Pacific Northwest history, art, and fine printing.",
      websiteUrl: "https://www.arundelbooks.com",
      hours: "Tue-Sat 11am-5pm",
      specialty: "Rare / Antiquarian",
    },
    {
      name: "Book Larder",
      slug: "book-larder",
      address: "4252 Fremont Ave N, Seattle, WA 98103",
      neighborhood: "Fremont",
      lat: 47.6605,
      lng: -122.3500,
      description:
        "Seattle's only bookstore dedicated entirely to food and drink. Book Larder offers an extensive collection of cookbooks, food writing, and beverage books, along with cooking classes, author events, and a curated selection of kitchen tools.",
      websiteUrl: "https://www.booklarder.com",
      hours: "Mon-Sat 10am-6pm, Sun 11am-5pm",
      specialty: "Cookbooks / Food & Drink",
    },
    {
      name: "Fantagraphics Bookstore & Gallery",
      slug: "fantagraphics-bookstore",
      address: "1201 S Vale St, Seattle, WA 98108",
      neighborhood: "Georgetown",
      lat: 47.5440,
      lng: -122.3200,
      description:
        "The retail arm of legendary comics publisher Fantagraphics Books. This Georgetown shop features an incredible selection of graphic novels, comics, art books, and zines, plus a rotating gallery of original comic art.",
      websiteUrl: "https://www.fantagraphics.com",
      hours: "Wed-Sun 12pm-6pm",
      specialty: "Comics / Graphic Novels",
    },
    {
      name: "Twice Sold Tales",
      slug: "twice-sold-tales",
      address: "1833 Harvard Ave, Seattle, WA 98122",
      neighborhood: "Capitol Hill",
      lat: 47.6159,
      lng: -122.3222,
      description:
        "A quirky used bookstore on Capitol Hill known for its resident cats and labyrinthine stacks. Twice Sold Tales offers a sprawling selection of secondhand books at great prices, with an atmosphere that feels like exploring a literary attic.",
      websiteUrl: null,
      hours: "Mon-Sun 11am-9pm",
      specialty: "Used Books",
    },
    {
      name: "Open Books: A Poem Emporium",
      slug: "open-books-poem-emporium",
      address: "2414 N 45th St, Seattle, WA 98103",
      neighborhood: "Wallingford",
      lat: 47.6615,
      lng: -122.3395,
      description:
        "One of only a handful of poetry-only bookstores in the country. Open Books stocks an incredible range of poetry collections, chapbooks, and literary journals, and hosts regular readings and poetry events.",
      websiteUrl: "https://www.openpoetrybooks.com",
      hours: "Tue-Sat 12pm-6pm",
      specialty: "Poetry",
    },
    {
      name: "Secret Garden Books",
      slug: "secret-garden-books",
      address: "6115 15th Ave NW, Seattle, WA 98107",
      neighborhood: "Ballard",
      lat: 47.6735,
      lng: -122.3758,
      description:
        "A charming neighborhood bookstore in Ballard's historic district, Secret Garden Books has been a community favorite for over 45 years. Known for its exceptional children's book section and welcoming atmosphere.",
      websiteUrl: "https://www.secretgardenbooks.com",
      hours: "Mon-Sat 10am-6pm, Sun 11am-5pm",
      specialty: "Children's / General",
    },
    {
      name: "Couth Buzzard Books",
      slug: "couth-buzzard-books",
      address: "8310 Greenwood Ave N, Seattle, WA 98103",
      neighborhood: "Greenwood",
      lat: 47.6878,
      lng: -122.3554,
      description:
        "A cozy used bookstore and espresso bar in the heart of Greenwood. Couth Buzzard hosts live music, open mic nights, art shows, and other community events, making it as much a cultural venue as a bookshop. The shelves are packed with a well-curated selection of secondhand books at fair prices.",
      websiteUrl: "https://www.couthbuzzardbooks.com",
      hours: "Mon-Sun 10am-8pm",
      specialty: "Used Books / Espresso Bar / Events",
    },
    {
      name: "Phinney Books",
      slug: "phinney-books",
      address: "7405 Greenwood Ave N, Seattle, WA 98103",
      neighborhood: "Phinney Ridge",
      lat: 47.6813,
      lng: -122.3554,
      description:
        "A neighborhood bookstore on Phinney Ridge offering a carefully curated selection of new books for all ages. Phinney Books is known for its strong community ties, author events, and a welcoming atmosphere that makes every visit feel personal.",
      websiteUrl: "https://www.phinneybooks.com",
      hours: "Mon-Sat 10am-6pm, Sun 11am-5pm",
      specialty: "General / Community",
    },
  ];

  for (const store of bookstores) {
    await prisma.bookstore.upsert({
      where: { slug: store.slug },
      update: store,
      create: store,
    });
  }

  console.log(`Seeded ${bookstores.length} bookstores`);

  // Seed blog posts
  const blogPosts = [
    {
      title: "The Best Independent Bookstores in Seattle's Capitol Hill",
      slug: "best-bookstores-capitol-hill",
      excerpt:
        "Capitol Hill is home to some of Seattle's most beloved independent bookstores. From the legendary Elliott Bay Book Company to the quirky Twice Sold Tales, here's your guide to literary exploration on the Hill.",
      content: `# The Best Independent Bookstores in Seattle's Capitol Hill

Capitol Hill has long been the cultural heart of Seattle, and its independent bookstores are a testament to the neighborhood's literary spirit.

## Elliott Bay Book Company

No list of Seattle bookstores would be complete without **Elliott Bay Book Company**. Since moving to Capitol Hill from Pioneer Square in 2010, this iconic shop has become even more of a community gathering place. With over 150,000 titles and one of the best author event series in the country, it's a must-visit for any book lover.

### What Makes It Special
- Massive curated selection across every genre
- Renowned author reading series
- Cozy basement cafe
- Knowledgeable, passionate staff

## Ada's Technical Books & Cafe

For the technically inclined, **Ada's Technical Books** is a one-of-a-kind destination. Specializing in STEMD (Science, Technology, Engineering, Math, and Design) books, Ada's combines intellectual curiosity with excellent coffee.

## Twice Sold Tales

If you love the thrill of the hunt, **Twice Sold Tales** is your paradise. This gloriously chaotic used bookstore is famous for its resident cats and towering stacks of secondhand treasures. You never know what you'll find.

---

*Whether you're a longtime resident or just visiting, Capitol Hill's bookstores offer something for every reader. Take an afternoon to explore them all — you won't be disappointed.*`,
      published: true,
      publishedAt: new Date("2024-12-15"),
    },
    {
      title: "A Guide to Seattle's Specialty Bookstores",
      slug: "seattle-specialty-bookstores",
      excerpt:
        "From poetry to cookbooks to comics, Seattle's specialty bookstores prove that there's a perfect shop for every reader's passion.",
      content: `# A Guide to Seattle's Specialty Bookstores

Seattle's independent bookstore scene isn't just about general-interest shops. The city is home to several remarkable specialty bookstores that cater to specific passions and interests.

## For the Poet: Open Books

**Open Books: A Poem Emporium** in Wallingford is one of only a few poetry-only bookstores in the entire United States. Whether you're into contemporary verse, classic poetry, or experimental chapbooks, this intimate shop has you covered.

## For the Cook: Book Larder

**Book Larder** in Fremont is paradise for food lovers. Dedicated entirely to cookbooks and food writing, it also hosts cooking classes and author events that bring Seattle's food community together.

## For the Comic Fan: Fantagraphics

Georgetown's **Fantagraphics Bookstore & Gallery** is the retail home of one of the most important comics publishers in the world. Their selection of graphic novels, art comics, and zines is unmatched.

## For the Radical: Left Bank Books

Tucked into Pike Place Market, **Left Bank Books** has been collectively run by volunteers since 1973. It's a vital source for radical political literature, zines, and countercultural works.

## For the Collector: Arundel Books

**Arundel Books** in Pioneer Square is the place for rare and antiquarian books. Their expertly curated collection includes fine editions, Pacific Northwest history, and literary treasures.

---

*These specialty shops are what make Seattle's bookstore scene truly special. Each one is a labor of love, run by people deeply passionate about their particular corner of the literary world.*`,
      published: true,
      publishedAt: new Date("2025-01-10"),
    },
    {
      title: "Why Independent Bookstores Matter More Than Ever",
      slug: "why-independent-bookstores-matter",
      excerpt:
        "In an age of online shopping and e-readers, independent bookstores continue to thrive in Seattle. Here's why they matter and how you can support them.",
      content: `# Why Independent Bookstores Matter More Than Ever

In a city known for being the birthplace of Amazon, Seattle's thriving independent bookstore scene might seem like a contradiction. But it's actually a powerful statement about the enduring value of physical bookstores and community spaces.

## Community Hubs

Independent bookstores serve as **community gathering places** in ways that online retailers never can. They host author readings, book clubs, children's story times, and community events that bring people together around shared love of reading.

## Curated Discovery

While algorithms try to predict what you might like based on past purchases, nothing beats the experience of **browsing physical shelves** curated by knowledgeable booksellers. The serendipity of discovering a book you never would have searched for online is one of the great joys of bookstore shopping.

## Local Economic Impact

**Money spent at independent bookstores stays in the community.** Studies show that local businesses recirculate a significantly larger share of every dollar in the local economy compared to chain retailers.

## How to Support Your Local Bookstore

1. **Buy books there** — even if they cost a little more than online
2. **Attend events** — author readings and book launches are usually free
3. **Gift cards** — they make great gifts and bring new customers in
4. **Spread the word** — tell friends, post on social media, write reviews
5. **Shop local for holidays** — bookstores are perfect for gift shopping

---

*Seattle's independent bookstores have survived the rise of big box stores, online retailers, and e-books. They'll continue to thrive as long as we choose to support them.*`,
      published: true,
      publishedAt: new Date("2025-02-01"),
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  console.log(`Seeded ${blogPosts.length} blog posts`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
