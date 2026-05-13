import { cp, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");

async function removeDotStoreFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await removeDotStoreFiles(entryPath);
      return;
    }

    if (entry.isFile() && entry.name === ".DS_Store") {
      await rm(entryPath, { force: true });
    }
  }));
}

await Promise.all([
  cp(path.join(rootDir, "robots.txt"), path.join(distDir, "robots.txt")),
  cp(path.join(rootDir, "sitemap.xml"), path.join(distDir, "sitemap.xml"))
]);

await removeDotStoreFiles(distDir);

