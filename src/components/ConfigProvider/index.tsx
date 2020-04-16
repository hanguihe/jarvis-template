import React from 'react';
import { ConfigProvider as Provider } from 'antd';
import cn from 'antd/es/locale/zh_CN';

const ConfigProvider: React.FC = ({ children }) => (
  <Provider locale={cn}>{children}</Provider>
);

export default ConfigProvider;
