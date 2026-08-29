import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base is left as default ("/") so `npm run dev` works on localhost.
// If you later deploy the built dist to a subpath (e.g. /portfolio-test/sandbox/khata/),
// change this to that path and rebuild.
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});
