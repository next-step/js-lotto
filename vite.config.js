import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  base: './',
  plyarnugins: [
    eslintPlugin({
      cache: false,
    }),
  ],
});
