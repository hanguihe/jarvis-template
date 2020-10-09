export default [
  {
    path: '/',
    name: '欢迎使用',
    icon: 'smile',
    component: '@/pages/welcome',
  },
  { path: '/test', icon: 'smile', name: '测试', component: '@/pages/test' },
  {
    path: '/example',
    redirect: '/example/context',
  },
  {
    name: '数据流方案',
    icon: 'appstore-add',
    routes: [
      {
        path: '/example/context',
        name: 'useContext',
        component: '@/pages/example/context',
      },
      {
        path: '/example/redux',
        name: 'redux',
        component: '@/pages/example/redux',
      },
    ],
  },
];
