import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

import vwt from 'weapp-tailwindcss-webpack-plugin/vite';
import postcssWeappTailwindcssRename from 'weapp-tailwindcss-webpack-plugin/postcss';

const isH5 = process.env.UNI_PLATFORM === 'h5';
// vite 插件配置
const vitePlugins = [uni()];
// postcss 插件配置
const postcssPlugins = [require('autoprefixer')(), require('tailwindcss')()];
if (!isH5) {
  vitePlugins.push(vwt());

  postcssPlugins.push(
    require('postcss-rem-to-responsive-pixel')({
      rootValue: 32,
      propList: ['*'],
      transformUnit: 'rpx',
    })
  );
  postcssPlugins.push(
    postcssWeappTailwindcssRename({
      // cssPreflight: {
      //   'box-sizing': false,
      // },
    })
  );
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: vitePlugins,
  server: {
    port: 5555,
    cors: true,
  },
  // 假如 postcss.config.js 不起作用，请使用内联 postcss Latset
  css: {
    postcss: {
      plugins: postcssPlugins,
    },
  },
});
