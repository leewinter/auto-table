// scripts/build.js
import { build, defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { readFileSync } from "fs";
const packageJson = JSON.parse(readFileSync("./package.json"));

const reactComponentLibrary = {
  plugins: [],
  entry: "./src/components/index.js",
  fileName: (format) => `auto-table.${format}.js`,
  name: "index",
};

const webcomponentsLibrary = {
  plugins: [],
  entry: "./src/components/index-wc.js",
  fileName: (format) => `auto-table-web-component.${format}.js`,
  name: "webcomponents",
};

const getSharedConfiguration = ({ plugins, ...library }) => {
  return defineConfig(() => ({
    plugins: [react(), ...plugins],
    build: {
      lib: {
        formats: ["es", "umd"],
        ...library,
      },
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      output: {
        globals: {
          react: "react",
        },
      },
    },
  }));
};

const viteBuild = (configFactory) => {
  const config = configFactory();

  return build(config);
};

const buildLibraries = async () => {
  await Promise.all(
    [webcomponentsLibrary, reactComponentLibrary]
      .map(getSharedConfiguration)
      .map(viteBuild),
  );
};

buildLibraries();
