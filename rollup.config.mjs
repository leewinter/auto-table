/**
 * NOTE: There is currently an open issue for adding 'use client' directive
 * https://github.com/rollup/rollup/issues/4699
 */

import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import analyze from "rollup-plugin-analyzer";
import preserveDirectives from "rollup-plugin-preserve-directives";
import css from "rollup-plugin-import-css";
import external from "rollup-plugin-peer-deps-external";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");

const babelRuntimeVersion = pkg.dependencies["@babel/runtime"].replace(
  /^[^0-9]*/,
  ""
);

const outputOptions = {
  exports: "named",
  preserveModules: true,
  // Ensures that CJS default exports are imported properly (based on __esModule)
  // If needed, can switch to 'compat' which checks for .default prop on the default export instead
  // see https://rollupjs.org/configuration-options/#output-interop
  interop: "auto",
  sourcemap: true,
  banner: `/*
 * Auto Table
 * @copyright Lee Winter
 * @license MIT
 */`,
};

const config = {
  input: "src/index.js",
  output: [
    {
      dir: "dist/esm",
      format: "esm",
      ...outputOptions,
    },
    {
      dir: "dist/cjs",
      format: "cjs",
      ...outputOptions,
    },
  ],
  plugins: [
    external(),
    alias({
      entries: {
        src: fileURLToPath(new URL("src", import.meta.url)),
      },
    }),
    css({ output: "assets/bundle-styles.css" }),
    nodeResolve({ preferBuiltins: true, mainFields: ["browser"] }),
    commonjs({ include: ["node_modules/**"] }),
    babel({
      babelHelpers: "runtime",
      exclude: /node_modules/,
      plugins: [
        ["@babel/plugin-transform-runtime", { version: babelRuntimeVersion }],
      ],
      presets: [
        ["@babel/preset-env", { targets: "defaults" }],
        ["@babel/preset-react", { runtime: "automatic" }],
      ],
    }),
    preserveDirectives(),
    terser(),
    analyze({
      hideDeps: true,
      limit: 0,
      summaryOnly: true,
    }),
  ],
  // Ignore warnings when using "use client" directive
  onwarn(warning, warn) {
    if (warning.code !== "MODULE_LEVEL_DIRECTIVE") {
      warn(warning);
    }
  },
};

export default config;
