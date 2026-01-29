import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import NewsletterSignup from "@/components/NewsletterSignup";

afterEach(cleanup);

describe("NewsletterSignup", () => {
  it("renders the email input and subscribe button", () => {
    render(<NewsletterSignup />);
    expect(
      screen.getByPlaceholderText("Enter your email address")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /subscribe/i })
    ).toBeInTheDocument();
  });

  it("renders compact version with different placeholder", () => {
    render(<NewsletterSignup compact />);
    expect(
      screen.getByPlaceholderText("your@email.com")
    ).toBeInTheDocument();
  });

  it("shows success message when no username configured", async () => {
    render(<NewsletterSignup />);

    const input = screen.getByPlaceholderText("Enter your email address");
    const button = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    const message = await screen.findByText(/thanks for your interest/i);
    expect(message).toBeInTheDocument();
  });

  it("requires email input", () => {
    render(<NewsletterSignup />);
    const input = screen.getByPlaceholderText("Enter your email address");
    expect(input).toBeRequired();
  });
});
