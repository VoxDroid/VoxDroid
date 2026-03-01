import { defineConfig } from "vitest/config";
// Actually, simple vitest config should be fine for now.

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
  },
});
