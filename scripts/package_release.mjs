import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repo = resolve(__dirname, "..");
const dist = resolve(repo, "dist");
const releaseDir = resolve(repo, "release");
const manifest = JSON.parse(readFileSync(resolve(dist, "manifest.json"), "utf8"));
const zipPath = resolve(releaseDir, `cleanin-chrome-store-v${manifest.version}.zip`);

if (!existsSync(releaseDir)) {
  mkdirSync(releaseDir, { recursive: true });
}

rmSync(zipPath, { force: true });
execFileSync("zip", ["-r", zipPath, ".", "-x", "*.DS_Store", "__MACOSX/*"], {
  cwd: dist,
  stdio: "inherit",
});

console.log(`wrote ${zipPath}`);
