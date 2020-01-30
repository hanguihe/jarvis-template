import React from 'react';
import Link from 'umi/link';
import ProLayout from '@ant-design/pro-layout';
import AuthInfo from '@/components/AuthInfo';
import RightContent from './RightContent';

const BasicLayout = props => {
  const { children } = props;

  return (
    <AuthInfo>
      <ProLayout
        title="Jarvis"
        menuHeaderRender={(logoDom, titleDom) => (
          <Link to="/">
            {logoDom}
            {titleDom}
          </Link>
        )}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        rightContentRender={() => <RightContent />}
        {...props}
      >
        {children}
      </ProLayout>
    </AuthInfo>
  );
};

export default BasicLayout;
