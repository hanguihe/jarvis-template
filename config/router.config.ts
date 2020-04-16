export default [
  {
    path: '/',
    name: '欢迎使用',
    icon: 'smile',
    component: '@/pages/welcome',
  },
  {
    path: '/example',
    redirect: '/example/context',
  },
  {
    name: '基础功能示例',
    icon: 'appstore-add',
    routes: [
      {
        path: '/example/ref',
        name: 'useRef',
        component: '@/pages/example/ref',
      },
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
