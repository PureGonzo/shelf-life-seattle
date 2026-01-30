import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const includeInactive = searchParams.get("active") === "false";

  const reads = await prisma.currentRead.findMany({
    where: includeInactive ? {} : { active: true },
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json(reads);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const maxOrder = await prisma.currentRead.aggregate({
    _max: { sortOrder: true },
  });

  const read = await prisma.currentRead.create({
    data: {
      title: body.title,
      author: body.author,
      coverUrl: body.coverUrl || null,
      linkUrl: body.linkUrl || null,
      notes: body.notes || null,
      active: body.active ?? true,
      sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
    },
  });

  return NextResponse.json(read, { status: 201 });
}
