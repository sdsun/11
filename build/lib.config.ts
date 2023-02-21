import { defineConfig } from 'vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import DefineOptions from 'unplugin-vue-define-options/dist/vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, '../src'),
      },
      {
        find: 'packages',
        replacement: path.resolve('.', 'packages'),
      },
    ],
  },
  build: {
    lib: {
      entry: path.resolve('.', './packages/index.ts'),
      name: 'GTMUI',
      fileName: (format) =>
        `gtmui.${format === 'cjs' ? '' : format + '.'}${format === 'umd' ? 'cjs' : format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'vue-router'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    vue(),
    DefineOptions(),
    vueJsx(),
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
    dts({
      libFolderPath: '../packages',
      outputDir: 'dist/types',
      cleanVueFileName: true,
      include: ['packages/**/*.vue', 'packages/**/*.ts', 'packages/**/*.tsx'],
      beforeWriteFile(filePath, content) {
        // 将入口声明文件位置提升至dist目录下
        if (/dist\\types\\index.d.ts/g.test(filePath)) {
          return {
            filePath: path.resolve('.', './dist/gtmui.d.ts'),
            content: content.replace(/.\//g, './types/'),
          };
        }
      },
    }),
  ],
});
