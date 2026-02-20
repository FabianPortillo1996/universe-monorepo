import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.join(dirname, "app"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [path.join(dirname, "vitest.setup.tsx")],
    include: ["__tests__/**/*.test.{ts,tsx}"],
  },
});
