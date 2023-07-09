import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as packageJson from './package.json'

import { resolve } from 'node:path'

// https://vitejs.dev/config/
// eslint-disable-next-line no-unused-vars
export default defineConfig((configEnv)=>({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve('src', 'components/index.js'),
      name: 'AutoTable',
      formats: ['es', 'umd'],
      fileName: (format) => `auto-table.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
}))
