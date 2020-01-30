// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/login',
      component: '../layouts/BlankLayout',
      routes: [{ path: '/login', name: '登录', component: '../pages/login' }],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        { path: '/', name: '欢迎', component: '../pages/home' },
        {
          path: '/other',
          name: '其他页面',
          routes: [
            {
              path: '/other/params/:id?',
              name: 'mock数据',
              component: '../pages/detail',
            },
          ],
        },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        dynamicImport: false,
        title: 'jarvis-template',
        dll: false,

        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
};
