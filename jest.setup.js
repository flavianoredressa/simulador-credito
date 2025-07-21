require("@testing-library/jest-dom");

// Suppress hydration warnings in tests
const originalError = console.error;
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation((message, ...args) => {
    if (
      typeof message === "string" &&
      (message.includes("In HTML, <html> cannot be a child of <div>") ||
        message.includes("This will cause a hydration error") ||
        message.includes("validateDOMNesting"))
    ) {
      return;
    }
    originalError(message, ...args);
  });
});

afterAll(() => {
  console.error.mockRestore();
});

// Mock next/router
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  }),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  }),
  usePathname: () => "/",
}));

// Mock ResizeObserver for Recharts
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
