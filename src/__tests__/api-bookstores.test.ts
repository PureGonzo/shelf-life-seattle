import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock prisma
const mockFindMany = vi.fn();
const mockCreate = vi.fn();

vi.mock("@/lib/prisma", () => ({
  prisma: {
    bookstore: {
      findMany: (...args: unknown[]) => mockFindMany(...args),
      create: (...args: unknown[]) => mockCreate(...args),
    },
  },
}));

// We need to test the API handler logic
describe("Bookstores API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns bookstores sorted by name", async () => {
    const mockBookstores = [
      { id: 1, name: "Ada's Technical Books", slug: "adas-technical-books" },
      { id: 2, name: "Elliott Bay Book Company", slug: "elliott-bay" },
    ];

    mockFindMany.mockResolvedValue(mockBookstores);

    const { GET } = await import("@/app/api/bookstores/route");
    const request = new Request("http://localhost:3000/api/bookstores");
    const response = await GET(request as any);
    const data = await response.json();

    expect(data).toEqual(mockBookstores);
    expect(mockFindMany).toHaveBeenCalledWith({
      where: {},
      orderBy: { name: "asc" },
    });
  });

  it("filters by neighborhood", async () => {
    mockFindMany.mockResolvedValue([]);

    const { GET } = await import("@/app/api/bookstores/route");
    const request = new Request(
      "http://localhost:3000/api/bookstores?neighborhood=Capitol+Hill"
    );
    const response = await GET(request as any);

    expect(mockFindMany).toHaveBeenCalledWith({
      where: { neighborhood: "Capitol Hill" },
      orderBy: { name: "asc" },
    });
  });

  it("searches bookstores", async () => {
    mockFindMany.mockResolvedValue([]);

    const { GET } = await import("@/app/api/bookstores/route");
    const request = new Request(
      "http://localhost:3000/api/bookstores?search=poetry"
    );
    const response = await GET(request as any);

    expect(mockFindMany).toHaveBeenCalledWith({
      where: {
        OR: [
          { name: { contains: "poetry" } },
          { description: { contains: "poetry" } },
          { neighborhood: { contains: "poetry" } },
          { specialty: { contains: "poetry" } },
        ],
      },
      orderBy: { name: "asc" },
    });
  });
});
