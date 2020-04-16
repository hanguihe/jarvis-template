import React from 'react';
import { ConfigProvider } from 'antd';
import zh from 'antd/es/locale/zh_CN';

export function rootContainer(container) {
  return <ConfigProvider locale={zh}>{container}</ConfigProvider>;
}
