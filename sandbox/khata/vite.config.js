import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base must match the GitHub Pages subpath so assets load correctly.
// Site URL: https://alokansh.github.io/portfolio-test/sandbox/khata/
export default defineConfig({
  base: "/portfolio-test/sandbox/khata/",
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});
