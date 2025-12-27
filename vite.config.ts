import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    // For Vercel + custom domain: base MUST be "/"
    // (The repo-name base is only for GitHub Pages.)
    base: "/",

    // Vercel expects "dist" by default. Use dist to avoid output-dir mismatch.
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },

    server: { host: "::", port: 8080 },

    plugins: [react(), isDev && componentTagger()].filter(Boolean),

    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  };
});
