// @ts-check

import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

/**
 * @type {import("vite-plugin-monkey").MonkeyOption}
 */
export const monkeyConfig = {
  entry: "src/main.ts",
  build: {
    fileName: "gmail-layout-script.user.js",
    metaFileName: "gmail-layout-script.meta.js",
    autoGrant: false,
  },
};

if (monkeyConfig.build?.fileName === undefined)
  throw Error("no build filename provided");
if (monkeyConfig.build?.metaFileName === undefined)
  throw Error("no build metafilename provided");

/**
 * @type {import('vite-plugin-monkey').TampermonkeyUserScript}
 */
const userscriptOptions = {
  name: "Gmail Layout Fix",
  namespace: "https://github.com/NilsGke/gmail-layout-script",
  description: "fix split layout",
  author: "NilsGke",
  match: "https://mail.google.com/*",
  downloadURL: `https://github.com/NilsGke/gmail-layout-script/releases/latest/download/${monkeyConfig.build.fileName}`,
  updateURL: `https://github.com/NilsGke/gmail-layout-script/releases/latest/download/${monkeyConfig.build.metaFileName}`,
  version: "{{version}}",
};

export const viteConfig = {
  build: {
    rollupOptions: {
      output: { dir: "dist" },
    },
    minify: false,
    sourcemap: true,
  },
  plugins: [
    monkey({
      ...monkeyConfig,
      userscript: userscriptOptions,
    }),
  ],
};

export default defineConfig(viteConfig);
