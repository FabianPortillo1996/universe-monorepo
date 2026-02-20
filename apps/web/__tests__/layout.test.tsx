import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import RootLayout, { metadata } from "../app/layout";

describe("RootLayout", () => {
  it("exports a non-empty metadata title", () => {
    expect(metadata.title).toBeTruthy();
  });

  it("exports a non-empty metadata description", () => {
    expect(metadata.description).toBeTruthy();
  });

  it("renders children inside the body", () => {
    render(
      <RootLayout>
        <p>Test child content</p>
      </RootLayout>
    );

    expect(screen.getByText("Test child content")).toBeInTheDocument();
  });

  it("renders multiple children correctly", () => {
    render(
      <RootLayout>
        <p>First child</p>
        <p>Second child</p>
      </RootLayout>
    );

    expect(screen.getByText("First child")).toBeInTheDocument();
    expect(screen.getByText("Second child")).toBeInTheDocument();
  });

  it("renders without crashing when children is an empty fragment", () => {
    render(
      <RootLayout>
        <></>
      </RootLayout>
    );

    expect(document.body).toBeInTheDocument();
  });
});
