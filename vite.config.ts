import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import langJsx from 'vite-plugin-lang-jsx'
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
export default defineConfig({
  base: '/privacyTools/', // 使用相对路径，因为nginx是部署在/privacyTools/下的
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')], // SVG 存放路径
      symbolId: 'icon-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.vue', '.json']
  },
  server: {
    host: '0.0.0.0', // 或者 '127.0.0.1'
    port: 5175, // 默认端口
  },
})
