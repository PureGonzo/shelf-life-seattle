import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const neighborhood = searchParams.get("neighborhood");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = {};

  if (neighborhood) {
    where.neighborhood = neighborhood;
  }

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
      { neighborhood: { contains: search } },
      { specialty: { contains: search } },
    ];
  }

  const bookstores = await prisma.bookstore.findMany({
    where,
    orderBy: { name: "asc" },
  });

  return NextResponse.json(bookstores);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const bookstore = await prisma.bookstore.create({
    data: {
      name: body.name,
      slug: body.slug,
      address: body.address,
      neighborhood: body.neighborhood,
      lat: body.lat,
      lng: body.lng,
      description: body.description,
      websiteUrl: body.websiteUrl || null,
      hours: body.hours || null,
      specialty: body.specialty || null,
      imageUrl: body.imageUrl || null,
    },
  });

  return NextResponse.json(bookstore, { status: 201 });
}
