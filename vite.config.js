import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const ignoredDirs = new Set([".git", ".netlify", "dist", "node_modules", ".claude"]);

function collectHtmlEntries(dir = rootDir, entries = {}) {
  for (const name of readdirSync(dir)) {
    if (ignoredDirs.has(name)) continue;

    const absolutePath = path.join(dir, name);
    const relativePath = path.relative(rootDir, absolutePath);
    const stats = statSync(absolutePath);

    if (stats.isDirectory()) {
      collectHtmlEntries(absolutePath, entries);
      continue;
    }

    if (stats.isFile() && name === "index.html") {
      const entryName = relativePath === "index.html"
        ? "index"
        : relativePath.replace(/\/index\.html$/, "");
      entries[entryName] = absolutePath;
    }
  }

  return entries;
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: collectHtmlEntries()
    }
  }
});

