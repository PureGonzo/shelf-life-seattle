import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const bookstore = await prisma.bookstore.findUnique({
    where: { id: parseInt(id) },
  });

  if (!bookstore) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(bookstore);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const bookstore = await prisma.bookstore.update({
    where: { id: parseInt(id) },
    data: body,
  });

  return NextResponse.json(bookstore);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.bookstore.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ success: true });
}
