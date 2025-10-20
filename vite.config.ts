import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Change this to your repo name if different
const REPO_NAME = "Mahmoud-Yassin-Portfolio";

export default defineConfig(({ mode }) => ({
  base: mode === "development" ? "/" : `/${REPO_NAME}/`,
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
