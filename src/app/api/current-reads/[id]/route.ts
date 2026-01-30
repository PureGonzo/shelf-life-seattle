import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const read = await prisma.currentRead.findUnique({
    where: { id: parseInt(id) },
  });

  if (!read) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(read);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const read = await prisma.currentRead.update({
    where: { id: parseInt(id) },
    data: body,
  });

  return NextResponse.json(read);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.currentRead.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ success: true });
}
