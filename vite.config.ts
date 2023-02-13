import { defineConfig } from 'vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import DefineOptions from 'unplugin-vue-define-options/dist/vite';
import svgLoader from 'vite-svg-loader';
import gzipPlugin from 'rollup-plugin-gzip';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
      {
        find: 'packages',
        replacement: path.resolve('.', 'packages'),
      },
    ],
  },
  build: {
    rollupOptions: {
      external: ['lodash'],
      output: {
        paths: {
          lodash: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js',
        },
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    svgLoader(),
    gzipPlugin(),
    DefineOptions(),
    vueJsx(),
  ],
});
