import React from "react";
import { HashRouter, Switch, Route, BrowserRouter } from "react-router-dom";
import AuthInfo from "./components/AuthInfo";
import { mapRouterConfig } from "./config/router.config";
import NotFoundPage from "./pages/404";

const Router = () => {

  const router = mapRouterConfig();
  console.log(router);

  return (
    <HashRouter>
      <AuthInfo>
        <Switch>
          {
            router.map((item) => {
              const Layout = item.layout;
              const Page = item.component;
              const Component = () => <Layout><Page /></Layout>;
              return <Route key={item.path} path={item.path} exact={item.exact} component={Component} />;
            })
          }
          <Route component={NotFoundPage} />
        </Switch>
      </AuthInfo>
    </HashRouter>
  );
};

export default Router;
