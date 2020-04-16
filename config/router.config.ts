export default [
  {
    path: '/',
    component: '@/components/ConfigProvider',
    routes: [
      {
        path: '/',
        name: '欢迎使用',
        icon: 'smile',
        component: '@/pages/welcome',
      },
      {
        path: '/example',
        name: '基本功能示例',
        icon: 'appstore-add',
        component: '@/pages/example',
      },
    ],
  },
];
