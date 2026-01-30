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
    {
      name: "Eagle Harbor Book Company",
      slug: "eagle-harbor-book-company",
      address: "157 Winslow Way E, Bainbridge Island, WA 98110",
      neighborhood: "Bainbridge Island",
      lat: 47.6245,
      lng: -122.5107,
      description: "A beloved community bookstore on Bainbridge Island offering a broad selection of new books, author events, and book clubs. A go-to destination for islanders and visitors alike.",
      websiteUrl: "https://www.eagleharborbooks.com",
      hours: "Mon-Sat 10am-6pm, Sun 11am-5pm",
      specialty: "General Interest / Book Club",
    },
    {
      name: "Ballard Books",
      slug: "ballard-books",
      address: "5416 20th Ave NW, Seattle, WA 98107",
      neighborhood: "Ballard",
      lat: 47.6688,
      lng: -122.3850,
      description: "A used and general interest bookstore in the heart of Ballard, offering a wide range of secondhand titles at great prices.",
      websiteUrl: null,
      hours: "Mon-Sun 11am-6pm",
      specialty: "Used / General Interest",
    },
    {
      name: "Push/Pull",
      slug: "push-pull",
      address: "2000 NW Market St, Seattle, WA 98107",
      neighborhood: "Ballard",
      lat: 47.6686,
      lng: -122.3840,
      description: "A zine and art retailer that serves as a clubhouse for independent Seattle artists of all kinds. A unique spot for discovering self-published and small-press works.",
      websiteUrl: null,
      hours: "Wed-Sun 12pm-6pm",
      specialty: "Zines / Art / Specialty",
    },
    {
      name: "Wanderlust Book Lounge",
      slug: "wanderlust-book-lounge",
      address: "10202 NE 185th St, Bothell, WA 98011",
      neighborhood: "Bothell",
      lat: 47.7589,
      lng: -122.2053,
      description: "An inviting bookstore in Bothell offering excellent travel books and two beloved book clubs. Founded by two friends looking for something fun to do with their retirement.",
      websiteUrl: null,
      hours: "Tue-Sat 10am-6pm, Sun 12pm-5pm",
      specialty: "General Interest / Book Club",
    },
    {
      name: "Ballast Book Co.",
      slug: "ballast-book-co",
      address: "409 Pacific Ave, Unit 202, Bremerton, WA 98337",
      neighborhood: "Bremerton",
      lat: 47.5653,
      lng: -122.6327,
      description: "A community-centered bookstore in Bremerton offering book clubs, author events, and a curated selection of new titles.",
      websiteUrl: null,
      hours: "Tue-Sat 10am-6pm, Sun 12pm-5pm",
      specialty: "General Interest / Book Club",
    },
    {
      name: "Page 2 Books",
      slug: "page-2-books",
      address: "560 SW 152nd St, Burien, WA 98166",
      neighborhood: "Burien",
      lat: 47.4688,
      lng: -122.3471,
      description: "A welcoming bookstore in Burien with a mix of new and used books, active book clubs, and a commitment to serving the diverse South King County community.",
      websiteUrl: null,
      hours: "Mon-Sat 10am-6pm, Sun 11am-5pm",
      specialty: "Used / General Interest / Book Club",
    },
    {
      name: "Three Trees Books",
      slug: "three-trees-books",
      address: "827 SW 152nd St, Burien, WA 98166",
      neighborhood: "Burien",
      lat: 47.4688,
      lng: -122.3510,
      description: "Once the smallest bookstore in the greater Seattle area, Three Trees Books in Olde Burien offers a carefully curated selection and active book club community.",
      websiteUrl: null,
      hours: "Tue-Sat 10am-6pm",
      specialty: "General Interest / Book Club",
    },
    {
      name: "Fuel Coffee & Books (Capitol Hill)",
      slug: "fuel-coffee-books-capitol-hill",
      address: "610 19th Ave E, Seattle, WA 98112",
      neighborhood: "Capitol Hill",
      lat: 47.6244,
      lng: -122.3075,
      description: "A bookshop outpost inside Fuel Coffee on Capitol Hill, part of a miniature empire of neighborhood bookshops run by Ada's Technical Books' Danielle Hulton.",
      websiteUrl: null,
      hours: "Mon-Sun 7am-5pm",
      specialty: "Cafe / General Interest",
    },
    {
      name: "Nook & Cranny Books",
      slug: "nook-and-cranny-books",
      address: "324 15th Ave E #101, Seattle, WA 98112",
      neighborhood: "Capitol Hill",
      lat: 47.6230,
      lng: -122.3127,
      description: "A used bookstore and book club hub on 15th Avenue packed with a cool kids' section and lots of passionate staff recommendations.",
      websiteUrl: null,
      hours: "Mon-Sun 10am-7pm",
      specialty: "Used / General Interest / Book Club",
    },
    {
      name: "Phoenix Comics and Games",
      slug: "phoenix-comics-and-games",
      address: "113 Broadway E, Seattle, WA 98102",
      neighborhood: "Capitol Hill",
      lat: 47.6156,
      lng: -122.3215,
      description: "A specialty comics and games shop on Broadway with an active book club and a dedicated community of fans.",
      websiteUrl: null,
      hours: "Mon-Sun 11am-7pm",
      specialty: "Comics / Games / Specialty",
    },
    {
      name: "Mam's Books",
      slug: "mams-books",
      address: "608 Maynard Ave S, Seattle, WA 98104",
      neighborhood: "Chinatown-International District",
      lat: 47.5984,
      lng: -122.3254,
      description: "The first independent bookstore to open in the Chinatown-International District in recent memory, intended to be a community hangout and a celebration of Seattle's Asian American community.",
      websiteUrl: null,
      hours: "Wed-Sun 11am-6pm",
      specialty: "Specialty / Asian American",
    },
    {
      name: "LEMS Cultural Center and Bookstore",
      slug: "lems-cultural-center",
      address: "5023 Rainier Ave S, Seattle, WA 98118",
      neighborhood: "Columbia City",
      lat: 47.5574,
      lng: -122.2873,
      description: "Founded by Vickie Williams over two decades ago, LEMS was the only Black-owned bookstore in Seattle for years. A life enrichment cultural center and bookstore serving the Columbia City community.",
      websiteUrl: null,
      hours: "Tue-Sat 10am-6pm",
      specialty: "Specialty / Cultural Center",
    },
    {
      name: "BLMF Literary Saloon",
      slug: "blmf-literary-saloon",
      address: "1501 Pike Place #322, Seattle, WA 98101",
      neighborhood: "Pike Place Market",
      lat: 47.6091,
      lng: -122.3421,
      description: "A chaotic and well-stocked used bookstore in Pike Place Market, full of hidden gems waiting to be discovered.",
      websiteUrl: null,
      hours: "Mon-Sun 10am-6pm",
      specialty: "Used / General Interest",
    },
    {
      name: "Chin Music Press",
      slug: "chin-music-press",
      address: "1501 Pike Place #329, Seattle, WA 98101",
      neighborhood: "Pike Place Market",
      lat: 47.6091,
      lng: -122.3419,
      description: "A sunny showroom and office for the local publisher in Pike Place Market, offering fiction, children's books, and nonfiction from their own catalog and select others.",
      websiteUrl: "https://www.chinmusicpress.com",
      hours: "Mon-Sat 11am-5pm",
      specialty: "Specialty / Publisher",
    },
    {
      name: "Golden Age Collectables",
      slug: "golden-age-collectables",
      address: "1501 Pike St #401, Seattle, WA 98101",
      neighborhood: "Pike Place Market",
      lat: 47.6091,
      lng: -122.3418,
      description: "Possibly the oldest comics shop in the world, Golden Age Collectables in Pike Place Market is a treasure trove of vintage and new comics, collectibles, and memorabilia.",
      websiteUrl: null,
      hours: "Mon-Sun 10am-6pm",
      specialty: "Comics / Collectibles / Used",
    },
    {
      name: "Lamplight Books",
      slug: "lamplight-books",
      address: "1514 Pike Place #14, Seattle, WA 98101",
      neighborhood: "Pike Place Market",
      lat: 47.6093,
      lng: -122.3415,
      description: "A used and general interest bookstore tucked into Pike Place Market, offering a browsable selection of secondhand titles.",
      websiteUrl: null,
      hours: "Mon-Sun 10am-6pm",
      specialty: "Used / General Interest",
    },
    {
      name: "Lion Heart Book Store",
      slug: "lion-heart-book-store",
      address: "1501 Pike Place #432, Seattle, WA 98101",
      neighborhood: "Pike Place Market",
      lat: 47.6090,
      lng: -122.3420,
      description: "Run by the happy, boisterous, occasionally singing David Ghoddousi, Lion Heart Books is a used and general interest gem in Pike Place Market.",
      websiteUrl: null,
      hours: "Mon-Sun 10am-6pm",
      specialty: "Used / General Interest",
    },
    {
      name: "Edmonds Bookshop",
      slug: "edmonds-bookshop",
      address: "111 Fifth Ave S, Edmonds, WA 98020",
      neighborhood: "Edmonds",
      lat: 47.8107,
      lng: -122.3773,
      description: "Serving the north Seattle area from downtown Edmonds since 1972. A general interest bookstore with active book clubs and deep community roots.",
      websiteUrl: "https://www.edmondsbookshop.com",
      hours: "Mon-Sat 10am-6pm, Sun 12pm-5pm",
      specialty: "General Interest / Book Club",
    },
    {
      name: "Charlie's Queer Books",
      slug: "charlies-queer-books",
      address: "465 N 36th St, Seattle, WA 98103",
      neighborhood: "Fremont",
      lat: 47.6517,
      lng: -122.3502,
      description: "One of Seattle's newest — and prettiest — bookstores, specializing in LGBTQ+ literature with a welcoming atmosphere and active book club.",
      websiteUrl: null,
      hours: "Mon-Sun 10am-7pm",
      specialty: "LGBTQ+ / Specialty / Book Club",
    },
    {
      name: "Ophelia's Books",
      slug: "ophelias-books",
      address: "3504 Fremont Ave N, Seattle, WA 98103",
      neighborhood: "Fremont",
      lat: 47.6521,
      lng: -122.3500,
      description: "A used bookstore in the heart of Fremont offering a wide and eclectic selection of secondhand titles in a classic bookshop atmosphere.",
      websiteUrl: null,
      hours: "Mon-Sun 11am-7pm",
      specialty: "Used / General Interest",
    },
    {
      name: "Outsider Comics",
      slug: "outsider-comics",
      address: "223 N 36th St, Seattle, WA 98103",
      neighborhood: "Fremont",
      lat: 47.6515,
      lng: -122.3505,
      description: "A specialty comics shop in Fremont offering a curated selection of comics, graphic novels, and related media.",
      websiteUrl: null,
      hours: "Wed-Sun 12pm-6pm",
      specialty: "Comics / Specialty",
    },
    {
      name: "Walls of Books",
      slug: "walls-of-books",
      address: "1025 NW Gilman Blvd, Suite E-3, Issaquah, WA 98027",
      neighborhood: "Issaquah",
      lat: 47.5376,
      lng: -122.0508,
      description: "A used bookstore in Issaquah with floor-to-ceiling shelves packed with secondhand books across every genre.",
      websiteUrl: null,
      hours: "Mon-Sat 10am-7pm, Sun 11am-6pm",
      specialty: "Used",
    },
    {
      name: "Sistah Scifi (Atlantic)",
      slug: "sistah-scifi-atlantic",
      address: "2300 S Massachusetts St, Seattle, WA 98144",
      neighborhood: "Judkins Park",
      lat: 47.5886,
      lng: -122.3058,
      description: "An outpost devoted to Black and Indigenous sci-fi and fantasy authors, located within the Northwest African American Museum in the Atlantic neighborhood.",
      websiteUrl: "https://www.sistahscifi.com",
      hours: "Wed-Sun 11am-5pm",
      specialty: "Sci-Fi / Fantasy / Specialty",
    },
    {
      name: "Page Turner Books",
      slug: "page-turner-books",
      address: "215 First Ave S, Kent, WA 98032",
      neighborhood: "Kent",
      lat: 47.3830,
      lng: -122.2330,
      description: "A used and specialty bookstore in Kent with active book clubs, run by bookseller Wayne Curran who has kept his dream of bookselling alive.",
      websiteUrl: null,
      hours: "Mon-Sat 10am-6pm",
      specialty: "Used / Specialty / Book Club",
    },
    {
      name: "BookTree",
      slug: "booktree",
      address: "609 Market St, Kirkland, WA 98033",
      neighborhood: "Kirkland",
      lat: 47.6764,
      lng: -122.2078,
      description: "A used and general interest bookstore in downtown Kirkland with book clubs and a welcoming community atmosphere.",
      websiteUrl: null,
      hours: "Mon-Sat 10am-6pm, Sun 12pm-5pm",
      specialty: "Used / General Interest / Book Club",
    },
    {
      name: "Madison Books",
      slug: "madison-books",
      address: "4118 E Madison St, Seattle, WA 98112",
      neighborhood: "Madison Park",
      lat: 47.6324,
      lng: -122.2841,
      description: "A tiny storefront in Madison Park that probably packs more great titles per square inch than any other bookstore in town. Active book club and expert curation.",
      websiteUrl: null,
      hours: "Mon-Sat 10am-6pm, Sun 11am-5pm",
      specialty: "General Interest / Book Club",
    },
    {
      name: "Paper Portal Used Books",
      slug: "paper-portal-used-books",
      address: "1105 34th Ave, Seattle, WA 98122",
      neighborhood: "Madrona",
      lat: 47.6120,
      lng: -122.2881,
      description: "Owned by bookseller Cam LaFlam, Paper Portal sells used books and weird VHS tapes, hosts open mics and intense book clubs in the Madrona neighborhood.",
      websiteUrl: null,
      hours: "Thu-Sun 12pm-6pm",
      specialty: "Used / Book Club",
    },
    {
      name: "Magnolia's Bookstore",
      slug: "magnolias-bookstore",
      address: "3206 W McGraw St, Seattle, WA 98199",
      neighborhood: "Magnolia",
      lat: 47.6399,
      lng: -122.4006,
      description: "A neighborhood general interest bookstore serving the Magnolia Village community with a curated selection and personal touch.",
      websiteUrl: null,
      hours: "Mon-Sat 10am-6pm, Sun 11am-5pm",
      specialty: "General Interest",
    },
    {
      name: "Island Books",
      slug: "island-books",
      address: "3014 78th Ave SE, Mercer Island, WA 98040",
      neighborhood: "Mercer Island",
      lat: 47.5718,
      lng: -122.2275,
      description: "Mercer Island's hometown bookstore offering a general interest selection, book clubs, and a strong connection to the island community.",
      websiteUrl: "https://www.mercerislandbooks.com",
      hours: "Mon-Sat 10am-6pm, Sun 11am-5pm",
      specialty: "General Interest / Book Club",
    },
    {
      name: "Fuel Coffee & Books (Montlake)",
      slug: "fuel-coffee-books-montlake",
      address: "2300 24th Ave E, Seattle, WA 98112",
      neighborhood: "Montlake",
      lat: 47.6322,
      lng: -122.3025,
      description: "A bookshop outpost inside Fuel Coffee in Montlake, part of a miniature empire of neighborhood bookshops at Fuel Coffee locations.",
      websiteUrl: null,
      hours: "Mon-Sun 7am-5pm",
      specialty: "Cafe / General Interest",
    },
    {
      name: "Peter Miller Books",
      slug: "peter-miller-books",
      address: "304 Alaskan Way S, Seattle, WA 98104",
      neighborhood: "Pioneer Square",
      lat: 47.5998,
      lng: -122.3343,
      description: "A design-focused bookshop in Pioneer Square known for enthusiastic book recommendations, offering books, radios, fountain pens, and other curated goods.",
      websiteUrl: "https://www.petermiller.com",
      hours: "Mon-Sat 10am-6pm",
      specialty: "Design / Architecture / Specialty",
    },
    {
      name: "Liberty Bay Books",
      slug: "liberty-bay-books",
      address: "18881 Front St NE, Suite D, Poulsbo, WA 98370",
      neighborhood: "Poulsbo",
      lat: 47.7331,
      lng: -122.6459,
      description: "A community bookstore in charming downtown Poulsbo with active book clubs and a carefully curated general interest selection.",
      websiteUrl: "https://www.libertybaybooks.com",
      hours: "Mon-Sat 10am-6pm, Sun 11am-5pm",
      specialty: "General Interest / Book Club",
    },
    {
      name: "Mercer Street Books",
      slug: "mercer-street-books",
      address: "7 Mercer St, Seattle, WA 98109",
      neighborhood: "Queen Anne",
      lat: 47.6244,
      lng: -122.3564,
      description: "A used bookstore at the base of Queen Anne that always seems to have a copy of that one elusive book you've long coveted. A treasure hunter's paradise.",
      websiteUrl: null,
      hours: "Mon-Sun 11am-7pm",
      specialty: "Used / General Interest",
    },
    {
      name: "Queen Anne Book Company",
      slug: "queen-anne-book-company",
      address: "1811 Queen Anne Ave N #103, Seattle, WA 98109",
      neighborhood: "Queen Anne",
      lat: 47.6370,
      lng: -122.3569,
      description: "A neighborhood bookstore atop Queen Anne Hill with active book clubs, author events, and a strong general interest selection.",
      websiteUrl: "https://www.qabookco.com",
      hours: "Mon-Sat 10am-7pm, Sun 10am-6pm",
      specialty: "General Interest / Book Club",
    },
    {
      name: "Third Place Books Ravenna",
      slug: "third-place-books-ravenna",
      address: "6504 20th Ave NE, Seattle, WA 98115",
      neighborhood: "Ravenna",
      lat: 47.6762,
      lng: -122.3139,
      description: "The Ravenna location of the Third Place Books chain, offering new and used books, a cafe, and the community-focused atmosphere the chain is known for.",
      websiteUrl: "https://www.thirdplacebooks.com",
      hours: "Mon-Sun 9am-8pm",
      specialty: "Cafe / Used / General Interest",
    },
    {
      name: "Brick & Mortar Books",
      slug: "brick-and-mortar-books",
      address: "7430 164th Ave NE, Suite B105, Redmond, WA 98052",
      neighborhood: "Redmond",
      lat: 47.6721,
      lng: -122.1197,
      description: "A community bookstore on the Eastside offering book clubs, author events, and a curated selection of new titles for readers of all ages.",
      websiteUrl: "https://www.brickandmortarbooks.com",
      hours: "Mon-Sat 10am-7pm, Sun 11am-6pm",
      specialty: "General Interest / Book Club",
    },
    {
      name: "Apparition Books",
      slug: "apparition-books",
      address: "814 S Third St, Renton, WA 98057",
      neighborhood: "Renton",
      lat: 47.4829,
      lng: -122.2043,
      description: "A used and specialty bookstore in Renton offering a unique selection of secondhand and niche titles.",
      websiteUrl: null,
      hours: "Wed-Sun 11am-6pm",
      specialty: "Used / Specialty",
    },
    {
      name: "Sistah Scifi (Roosevelt)",
      slug: "sistah-scifi-roosevelt",
      address: "6401 Roosevelt Way NE, Seattle, WA 98115",
      neighborhood: "Roosevelt",
      lat: 47.6759,
      lng: -122.3177,
      description: "A specialty bookstore devoted to Black and Indigenous sci-fi and fantasy authors, with an active book club and passionate community.",
      websiteUrl: "https://www.sistahscifi.com",
      hours: "Wed-Sun 11am-6pm",
      specialty: "Sci-Fi / Fantasy / Specialty / Book Club",
    },
    {
      name: "University Book Store",
      slug: "university-book-store",
      address: "4326 University Way NE, Seattle, WA 98105",
      neighborhood: "University District",
      lat: 47.6598,
      lng: -122.3128,
      description: "Seattle's oldest bookstore, celebrating over 124 years in business. Known for its world-class science fiction section, cafe, used book department, and active book clubs.",
      websiteUrl: "https://www.ubookstore.com",
      hours: "Mon-Sat 10am-7pm, Sun 11am-6pm",
      specialty: "General Interest / Cafe / Book Club",
    },
    {
      name: "Vashon Bookshop",
      slug: "vashon-bookshop",
      address: "17612 Vashon Hwy SW, Vashon, WA 98070",
      neighborhood: "Vashon",
      lat: 47.4476,
      lng: -122.4633,
      description: "Vashon Island's hometown bookstore offering new and gently used books in a welcoming island atmosphere.",
      websiteUrl: null,
      hours: "Mon-Sat 10am-6pm, Sun 11am-5pm",
      specialty: "Used / General Interest",
    },
    {
      name: "Fuel Coffee & Books (Wallingford)",
      slug: "fuel-coffee-books-wallingford",
      address: "1705 N 45th St, Seattle, WA 98103",
      neighborhood: "Wallingford",
      lat: 47.6612,
      lng: -122.3354,
      description: "A bookshop outpost inside Fuel Coffee in Wallingford, part of a miniature empire of neighborhood bookshops at Fuel Coffee locations.",
      websiteUrl: null,
      hours: "Mon-Sun 7am-5pm",
      specialty: "Cafe / General Interest",
    },
    {
      name: "Magus Books Annex",
      slug: "magus-books-annex",
      address: "2414 N 45th St, Seattle, WA 98103",
      neighborhood: "Wallingford",
      lat: 47.6615,
      lng: -122.3395,
      description: "The Wallingford annex of the beloved Magus Books, offering additional used and general interest titles in a second location.",
      websiteUrl: "https://www.magusbooks.com",
      hours: "Mon-Sun 10am-8pm",
      specialty: "Used / General Interest",
    },
    {
      name: "Wise Owl Books & Music",
      slug: "wise-owl-books-and-music",
      address: "2223 N 56th St, Seattle, WA 98103",
      neighborhood: "Wallingford",
      lat: 47.6706,
      lng: -122.3382,
      description: "A used bookstore and music shop in Wallingford offering a varied selection of secondhand books and records.",
      websiteUrl: null,
      hours: "Mon-Sat 11am-6pm, Sun 12pm-5pm",
      specialty: "Used / Music / General Interest",
    },
    {
      name: "Pegasus Book Exchange",
      slug: "pegasus-book-exchange",
      address: "4553 California Ave SW, Seattle, WA 98116",
      neighborhood: "West Seattle",
      lat: 47.5607,
      lng: -122.3865,
      description: "A used bookstore in the heart of the West Seattle Junction offering a wide-ranging selection of secondhand titles.",
      websiteUrl: null,
      hours: "Mon-Sat 10am-7pm, Sun 11am-6pm",
      specialty: "Used / General Interest",
    },
    {
      name: "Moonraker Books",
      slug: "moonraker-books",
      address: "209 First St, Langley, WA 98260",
      neighborhood: "Whidbey Island",
      lat: 48.0401,
      lng: -122.4065,
      description: "A general interest bookstore in downtown Langley on Whidbey Island, opened over half a century ago and still going strong.",
      websiteUrl: null,
      hours: "Mon-Sun 10am-5pm",
      specialty: "General Interest",
    },
    {
      name: "Joie Des Livres",
      slug: "joie-des-livres",
      address: "216 Market St, Pacific Beach, WA 98571",
      neighborhood: "Seabrook",
      lat: 47.2063,
      lng: -124.2052,
      description: "A general interest bookstore in the charming coastal community of Seabrook on Washington's Pacific coast.",
      websiteUrl: null,
      hours: "Mon-Sun 10am-5pm",
      specialty: "General Interest",
    },
    {
      name: "Uppercase Bookshop",
      slug: "uppercase-bookshop",
      address: "1010 Second St B, Snohomish, WA 98290",
      neighborhood: "Snohomish",
      lat: 47.9126,
      lng: -122.0985,
      description: "A used and general interest bookstore in a log cabin in historic Snohomish, offering a cozy and unique browsing experience.",
      websiteUrl: null,
      hours: "Wed-Sun 11am-5pm",
      specialty: "Used / General Interest",
    },
    {
      name: "Destiny City Comics",
      slug: "destiny-city-comics",
      address: "218 St Helens Ave, Tacoma, WA 98402",
      neighborhood: "Tacoma",
      lat: 47.2529,
      lng: -122.4401,
      description: "A specialty comics shop in Tacoma with an active book club and a passionate community of comics fans.",
      websiteUrl: null,
      hours: "Tue-Sat 11am-7pm, Sun 12pm-5pm",
      specialty: "Comics / Specialty / Book Club",
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
