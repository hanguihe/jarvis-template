import React from "react";
import ProLayout from "@ant-design/pro-layout";
import DefaultFooter from "../../components/DefaultFooter";
import config from "../../config/router.config";
import logo from "../../assets/images/logo.svg";
import { Link, withRouter } from "react-router-dom";
import UserContent from "../../components/GlobalHeader/UserContent";

const BasicLayout = ({ location, children }) => {
  return (
    <ProLayout
      title="WhatTheHan"
      logo={logo}
      route={config}
      location={location}
      footerRender={DefaultFooter}
      rightContentRender={() => <UserContent />}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
    >
      {children}
    </ProLayout>
  );
};

export default withRouter(BasicLayout);
