// scripts/build.js
import { build, defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { readFileSync } from "fs";
const packageJson = JSON.parse(readFileSync("./package.json"));

const getWebComponentConfiguration = () => {
  return defineConfig({
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          // lib/auto-table-web-component-[name].[ext]
          entryFileNames: `lib/auto-table-web-component.js`,
          chunkFileNames: `lib/auto-table-web-component.js`,
          assetFileNames: `lib/auto-table-web-component.[ext]`,
        },
      },
    },
  });
};

const getReactConfiguration = () => {
  return defineConfig({
    plugins: [react()],
    build: {
      lib: {
        formats: ["es", "umd"],
        entry: "./src/components/index.js",
        fileName: (format) => `lib/auto-table.${format}.js`,
        name: "library",
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
  });
};

const viteBuild = (configFactory) => {
  const config = configFactory();

  return build(config);
};

const buildLibraries = async () => {
  await Promise.all(
    [getWebComponentConfiguration, getReactConfiguration].map(viteBuild),
  );
};

buildLibraries();
