"use client";

import { useState, FormEvent } from "react";

interface NewsletterSignupProps {
  compact?: boolean;
}

export default function NewsletterSignup({
  compact = false,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const username = process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME;

    if (!username) {
      setStatus("success");
      setMessage(
        "Thanks for your interest! Newsletter signup will be available soon."
      );
      setEmail("");
      return;
    }

    try {
      const res = await fetch(
        `https://api.buttondown.com/v1/subscribers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email_address: email,
            tags: ["seattle-bookstores"],
          }),
        }
      );

      if (res.ok) {
        setStatus("success");
        setMessage("You're subscribed! Check your email for confirmation.");
        setEmail("");
      } else {
        const data = await res.json();
        setStatus("error");
        setMessage(data.detail || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 rounded-md bg-emerald-800 px-3 py-2 text-sm text-white placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500 disabled:opacity-50"
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </div>
        {status === "success" && (
          <p className="text-sm text-green-300">{message}</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-300">{message}</p>
        )}
      </form>
    );
  }

  return (
    <div className="rounded-lg bg-emerald-50 p-8">
      <h2 className="mb-2 text-2xl font-bold text-emerald-900">
        Subscribe to Our Newsletter
      </h2>
      <p className="mb-6 text-emerald-700">
        Get the latest news about Seattle&apos;s independent bookstores, upcoming
        events, and new blog posts delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="flex-1 rounded-lg border border-emerald-300 px-4 py-3 text-emerald-900 placeholder-emerald-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-emerald-700 px-8 py-3 font-semibold text-white transition-colors hover:bg-emerald-600 disabled:opacity-50"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {status === "success" && (
        <p className="mt-4 rounded-md bg-green-50 p-3 text-green-700">
          {message}
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 rounded-md bg-red-50 p-3 text-red-700">{message}</p>
      )}
    </div>
  );
}
