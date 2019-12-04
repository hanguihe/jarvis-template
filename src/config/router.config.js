import { BasicLayout } from '../layout';

import Welcome from '../pages/Welcome';
import MatchParams from '../pages/MatchParams';

const config = {
  path: '/',
  routes: [
    {
      path: '/',
      icon: 'home',
      name: '欢迎',
      exact: true,
      hideInMenu: false,
      layout: BasicLayout,
      component: Welcome,
    },
    {
      path: '/extra',
      icon: 'home',
      name: '其他',
      exact: true,
      hideInMenu: false,
      redirect: '/extra/123',
      routes: [
        {
          path: '/extra/:id',
          icon: 'home',
          name: '其他子项',
          exact: true,
          hideInMenu: false,
          layout: BasicLayout,
          component: MatchParams,
        },
      ],
    },
  ],
};

export const mapRouterConfig = () => {
  const router = [];

  const loop = data => {
    data.forEach(item => {
      if (item.routes) {
        if (item.redirect) {
          router.push({
            path: item.path,
            exact: item.exact,
            redirect: item.redirect,
          });
        }
        loop(item.routes);
      } else {
        router.push({
          path: item.path,
          name: item.name,
          layout: item.layout,
          component: item.component,
          icon: item.icon ? item.icon : null,
          exact: item.exact ? item.exact : true,
          hideInMenu: item.hideInMenu ? item.hideInMenu : false,
          redirect: item.redirect,
        });
      }
    });
  };

  loop(config.routes);
  return router;
};

export default config;
