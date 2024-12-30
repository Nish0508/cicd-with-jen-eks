import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig, loadEnv } from "vite";
import fs from "fs";
import path, { dirname } from "path";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import viteCompression from "vite-plugin-compression";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import EnvironmentPlugin from "vite-plugin-environment";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
// uses default port 5173 if port is not set
const port = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  let isStaging = env.VITE_APP_ENV === "staging";
  let isProduction = env.VITE_APP_ENV === "production";
  console.log(`is production - ${isProduction}`);
  return {
    plugins: [
      react(),
      eslint(),
      ViteImageOptimizer(),
      (isProduction || isStaging) && viteCompression(),
      (isProduction || isStaging) && viteCompression({ algorithm: "brotliCompress" }),
      nodeEnv === "production" &&
        EnvironmentPlugin({
          FRONTEND_VERSION: fs
            .readFileSync(path.resolve(dirname(__filename), "./stage-hash.txt"), "utf-8")
            .trim()
        }),
      viteTsconfigPaths(),
      svgr(),
      isProduction
        ? sentryVitePlugin({
            org: "privatetest-9g",
            project: "privatetest-9g",
            authToken: process.env.SENTRY_AUTH_TOKEN,
            silent: false
          })
        : false
    ],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/tests/setup.js",
      testMatch: ["./**/*.test.jsx"]
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
    server: {
      port
    },
    build: {
      sourcemap: isProduction,
      outDir: "tempdist" // temporary location
    },
    tsconfig: "./tsconfig.json"
  };
});
