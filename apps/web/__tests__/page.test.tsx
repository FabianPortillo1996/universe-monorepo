import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "../app/page";

describe("Home page", () => {
  it("renders both light and dark Turborepo logo variants", () => {
    render(<Home />);

    const logos = screen.getAllByAltText("Turborepo logo");
    expect(logos).toHaveLength(2);
  });

  it("renders deploy CTA link pointing to Vercel clone URL", () => {
    render(<Home />);

    const deployLink = screen.getByRole("link", { name: /deploy now/i });
    expect(deployLink).toHaveAttribute(
      "href",
      expect.stringContaining("vercel.com/new/clone"),
    );
  });

  it("renders docs link pointing to turborepo.dev/docs", () => {
    render(<Home />);

    const docsLink = screen.getByRole("link", { name: /read our docs/i });
    expect(docsLink).toHaveAttribute(
      "href",
      expect.stringContaining("turborepo.dev/docs"),
    );
  });

  it("renders examples footer link pointing to Vercel templates", () => {
    render(<Home />);

    const examplesLink = screen.getByRole("link", { name: /examples/i });
    expect(examplesLink).toHaveAttribute(
      "href",
      expect.stringContaining("vercel.com/templates"),
    );
  });

  it("renders turborepo.dev footer link", () => {
    render(<Home />);

    const turborepoLink = screen.getByRole("link", {
      name: /go to turborepo\.dev/i,
    });
    expect(turborepoLink).toHaveAttribute(
      "href",
      expect.stringContaining("turborepo.dev"),
    );
  });

  it("opens all external links in a new tab with noopener noreferrer", () => {
    render(<Home />);

    const links = screen.getAllByRole("link");
    for (const link of links) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("renders the instructional ordered list", () => {
    render(<Home />);

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
  });

  it("does not render any links without an href", () => {
    render(<Home />);

    const links = screen.getAllByRole("link");
    for (const link of links) {
      expect(link).toHaveAttribute("href");
      expect(link.getAttribute("href")).not.toBe("");
    }
  });
});
