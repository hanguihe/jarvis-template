import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import ErrorBoundary from '@/components/ErrorBoundary';

export function rootContainer(container: React.ReactChildren) {
  return (
    <ConfigProvider locale={zhCN}>
      <ErrorBoundary>{container}</ErrorBoundary>
    </ConfigProvider>
  );
}
