import { viewport } from "../viewport";

describe("Viewport Configuration", () => {
  it("should have proper viewport configuration", () => {
    expect(viewport).toBeDefined();
  });

  it("should have theme colors for light and dark modes", () => {
    expect(viewport.themeColor).toHaveLength(2);
    expect(viewport.themeColor).toEqual([
      { media: "(prefers-color-scheme: light)", color: "#2563eb" },
      { media: "(prefers-color-scheme: dark)", color: "#3b82f6" },
    ]);
  });

  it("should have correct device width", () => {
    expect(viewport.width).toBe("device-width");
  });

  it("should have correct initial scale", () => {
    expect(viewport.initialScale).toBe(1);
  });

  it("should have correct maximum scale", () => {
    expect(viewport.maximumScale).toBe(5);
  });

  it("should be a valid Viewport object", () => {
    // Check that all required properties exist
    expect(typeof viewport.width).toBe("string");
    expect(typeof viewport.initialScale).toBe("number");
    expect(typeof viewport.maximumScale).toBe("number");
    expect(Array.isArray(viewport.themeColor)).toBe(true);
  });
});
