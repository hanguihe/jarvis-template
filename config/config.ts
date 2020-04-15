import { defineConfig } from 'umi';
import plugins from './plugin.config';
import theme from './theme.config';
import routes from './router.config';

export default defineConfig({
  favicon: './favicon.ico',
  // 使用hash路由
  history: {
    type: 'hash',
  },
  // 打包文件hash命名
  hash: true,
  publicPath: './',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  theme: theme,
  ...plugins,
});
