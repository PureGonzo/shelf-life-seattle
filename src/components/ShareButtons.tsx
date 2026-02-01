"use client";

import { useState, useEffect } from "react";

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const links = [
    {
      label: "Bluesky",
      href: `https://bsky.app/intent/compose?text=${encodedTitle}+${encodedUrl}`,
    },
    {
      label: "Reddit",
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
      label: "Threads",
      href: `https://www.threads.net/intent/post?text=${encodedTitle}+${encodedUrl}`,
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 pt-6">
      <span className="text-sm font-medium text-gray-500">Share:</span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.label === "Email" ? undefined : "_blank"}
          rel={link.label === "Email" ? undefined : "noopener noreferrer"}
          className="rounded-md border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-emerald-700 transition-colors hover:bg-amber-100"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
