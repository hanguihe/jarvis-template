import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useRequest } from '@umijs/hooks';
import { getTableList } from '@/services/api';
import { getRequestError } from '@/utils/function';
import { ExampleFilter, ExampleTable, ExampleForm } from './components';

const ExamplePage = () => {
  const filter = useRef(null);
  const formRef = useRef(null);

  const { loading, run, data = [] } = useRequest(getTableList, {
    formatResult: ({ code, msg, data }) => {
      if (code !== 0) {
        return getRequestError('获取数据失败', msg);
      }
      return data;
    },
    onError: err => getRequestError('获取数据失败', err),
  });

  return (
    <PageHeaderWrapper
      title={false}
      content={<ExampleFilter ref={filter} loading={loading} onSubmit={run} />}
    >
      <ExampleTable
        loading={loading}
        dataSource={data}
        openDrawer={data => formRef.current.open(data)}
        refresh={() => filter.current.submit()}
      />
      <ExampleForm ref={formRef} refresh={() => filter.current.submit()} />
    </PageHeaderWrapper>
  );
};

export default ExamplePage;
