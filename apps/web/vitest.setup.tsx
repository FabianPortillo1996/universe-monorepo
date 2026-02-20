import React from "react";
import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";

afterEach(() => {
  vi.restoreAllMocks();
});

vi.mock("next/image", () => ({
  default: (props: React.ComponentProps<"img">) => {
    return React.createElement("img", props);
  },
}));

vi.mock("next/font/local", () => ({
  default: () => ({
    variable: "--font-mocked",
    className: "mocked-font",
  }),
}));
