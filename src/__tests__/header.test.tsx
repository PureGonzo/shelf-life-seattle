import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Header from "@/components/Header";

afterEach(cleanup);

describe("Header", () => {
  it("renders the site title", () => {
    render(<Header />);
    expect(screen.getByText("Shelf Life Seattle")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Header />);
    expect(screen.getAllByText("Home").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Map").length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText("Bookstores").length
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Blog").length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText("Newsletter").length
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("About").length).toBeGreaterThanOrEqual(1);
  });

  it("toggles mobile menu", () => {
    render(<Header />);
    const menuButton = screen.getAllByLabelText("Toggle menu")[0];

    const homeLinksBefore = screen.getAllByText("Home");
    const countBefore = homeLinksBefore.length;

    fireEvent.click(menuButton);

    const homeLinksAfter = screen.getAllByText("Home");
    expect(homeLinksAfter.length).toBeGreaterThan(countBefore);
  });
});
