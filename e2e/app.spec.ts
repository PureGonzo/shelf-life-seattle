import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("displays the title and map", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /seattle.*independent.*bookstores/i })
    ).toBeVisible();
    // Map container should load
    await expect(page.locator(".leaflet-container")).toBeVisible({
      timeout: 10000,
    });
  });

  test("has search and filter controls", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByPlaceholder("Search bookstores...")
    ).toBeVisible();
    await expect(page.getByRole("combobox")).toBeVisible();
  });
});

test.describe("Bookstores", () => {
  test("lists bookstores grouped by neighborhood", async ({ page }) => {
    await page.goto("/bookstores");
    await expect(
      page.getByRole("heading", { name: "Seattle Bookstores" })
    ).toBeVisible();
    await expect(page.getByText("Capitol Hill")).toBeVisible();
    await expect(page.getByText("Elliott Bay Book Company")).toBeVisible();
  });

  test("shows bookstore detail page", async ({ page }) => {
    await page.goto("/bookstores/elliott-bay-book-company");
    await expect(
      page.getByRole("heading", { name: "Elliott Bay Book Company" })
    ).toBeVisible();
    await expect(page.getByText("Capitol Hill")).toBeVisible();
    await expect(page.getByText("1521 10th Ave")).toBeVisible();
  });
});

test.describe("Blog", () => {
  test("lists published blog posts", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();
    await expect(
      page.getByText("Capitol Hill", { exact: false })
    ).toBeVisible();
  });

  test("shows blog post with markdown rendering", async ({ page }) => {
    await page.goto("/blog/best-bookstores-capitol-hill");
    await expect(
      page.getByRole("heading", {
        name: /best independent bookstores.*capitol hill/i,
      })
    ).toBeVisible();
  });
});

test.describe("Newsletter", () => {
  test("displays newsletter signup form", async ({ page }) => {
    await page.goto("/newsletter");
    await expect(
      page.getByRole("heading", { name: "Newsletter" })
    ).toBeVisible();
    await expect(
      page.getByPlaceholder("Enter your email address")
    ).toBeVisible();
  });
});

test.describe("Navigation", () => {
  test("navigates between pages via header links", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Bookstores" }).first().click();
    await expect(page).toHaveURL("/bookstores");
    await page.getByRole("link", { name: "Blog" }).first().click();
    await expect(page).toHaveURL("/blog");
  });
});
