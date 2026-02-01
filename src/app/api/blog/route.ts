import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const includeUnpublished = searchParams.get("all") === "true";

  const blogPosts = await prisma.blogPost.findMany({
    where: includeUnpublished ? {} : { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return NextResponse.json(blogPosts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const post = await prisma.blogPost.create({
    data: {
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt,
      imageUrl: body.imageUrl || null,
      published: body.published ?? false,
      publishedAt: body.published ? new Date() : null,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
