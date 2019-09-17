import { BasicLayout } from "../layout";

import HomePage from "../pages/HomePage";

const config = {
  path: "/",
  routes: [
    {
      path: "/",
      icon: "home",
      name: "欢迎",
      exact: true,
      hideInMenu: false,
      layout: BasicLayout,
      component: HomePage,
    },
    {
      path: "/extra",
      icon: "home",
      name: "其他",
      exact: true,
      hideInMenu: false,
      layout: BasicLayout,
      component: HomePage,
      routes: [
        {
          path: "/extra/1",
          icon: "home",
          name: "其他子项-1",
          exact: true,
          hideInMenu: false,
          layout: BasicLayout,
          component: HomePage,
        },
        {
          path: "/extra/2",
          icon: "home",
          name: "其他子项-2",
          exact: true,
          hideInMenu: false,
          layout: BasicLayout,
          component: HomePage,
        }
      ]
    }
  ]
};

export const mapRouterConfig = () => {
  const router = [];

  const loop = (data) => {

    data.forEach((item) => {
      if (item.routes) {
        loop(item.routes);
      } else {
        router.push({
          key: item.key,
          path: item.path,
          name: item.name,
          layout: item.layout,
          component: item.component,
          icon: item.icon ? item.icon : null,
          exact: item.exact ? item.exact : true,
          hideInMenu: item.hideInMenu ? item.hideInMenu : false,
        });
      }
    });
  };

  loop(config.routes);
  return router;
};

export default config;
