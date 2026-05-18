import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { defineConfig, type Plugin } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

type ExtensionTarget = "dev" | "prod";

type TargetConfig = {
  displayName: string;
  shortName: string;
  iconDiscColor: string;
  outputDirName: string;
};

const TARGET_CONFIG = {
  dev: {
    displayName: "CleanIn Dev - Hide LinkedIn promoted and suggested posts",
    shortName: "CleanIn Dev",
    iconDiscColor: "#ffd60a",
    outputDirName: "dist-dev",
  },
  prod: {
    displayName: "CleanIn - Hide LinkedIn promoted and suggested posts",
    shortName: "CleanIn",
    iconDiscColor: "#ffffff",
    outputDirName: "dist",
  },
} as const satisfies Record<ExtensionTarget, TargetConfig>;

export default defineConfig(({ mode }) => {
  const extensionTarget = getExtensionTarget();
  const targetConfig = TARGET_CONFIG[extensionTarget];
  const isProduction = mode === "production";
  const outDir = resolve(__dirname, targetConfig.outputDirName);

  return {
    plugins: [copyExtensionPackage(targetConfig, outDir)],
    build: {
      outDir,
      emptyOutDir: true,
      minify: isProduction ? "esbuild" : false,
      sourcemap: false,
      rollupOptions: {
        input: resolve(__dirname, "vite-entry.js"),
      },
    },
  };
});

function copyExtensionPackage(targetConfig: TargetConfig, outDir: string): Plugin {
  return {
    name: "copy-cleanin-extension",
    closeBundle() {
      rmSync(outDir, { recursive: true, force: true });
      mkdirSync(outDir, { recursive: true });

      const sourceDir = resolve(__dirname, "extension-src");
      cpSync(sourceDir, outDir, {
        recursive: true,
        filter: (source) => !source.endsWith("/icons"),
      });

      const iconsDir = resolve(outDir, "icons");
      mkdirSync(iconsDir, { recursive: true });
      execFileSync(
        "python3",
        [
          resolve(__dirname, "scripts/render_extension_icons.py"),
          "--out-dir",
          iconsDir,
          "--disk-color",
          targetConfig.iconDiscColor,
        ],
        { stdio: "inherit" },
      );

      writeTargetManifest(outDir, targetConfig);
    },
  };
}

function getExtensionTarget(): ExtensionTarget {
  return process.env.CLEANIN_EXTENSION_TARGET === "prod" ? "prod" : "dev";
}

function writeTargetManifest(outDir: string, targetConfig: TargetConfig) {
  const manifestPath = resolve(outDir, "manifest.json");
  if (!existsSync(manifestPath)) {
    throw new Error(`Missing ${manifestPath}`);
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as {
    action?: {
      default_title?: string;
      default_icon?: Record<string, string>;
    };
    icons?: Record<string, string>;
    name?: string;
    short_name?: string;
  };

  const iconPaths = {
    "16": "icons/icon16.png",
    "32": "icons/icon32.png",
    "48": "icons/icon48.png",
    "64": "icons/icon64.png",
    "128": "icons/icon128.png",
  };

  manifest.name = targetConfig.displayName;
  manifest.short_name = targetConfig.shortName;
  manifest.action = {
    ...(manifest.action ?? {}),
    default_title: targetConfig.shortName,
    default_icon: iconPaths,
  };
  manifest.icons = iconPaths;

  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}
