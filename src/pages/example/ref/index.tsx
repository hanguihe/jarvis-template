import React, { useEffect, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useRequest } from '@umijs/hooks';
import { getTableList } from '@/services/api';
import { getRequestError } from '@/utils/function';
import {
  ExampleFilter,
  ExampleTable,
  ExampleForm,
  FilterRef,
  FormRef,
} from './components';
import { ExampleData } from '@/pages/example/data';

const ExamplePage: React.FC = () => {
  const filterRef = useRef<FilterRef>(null);
  const formRef = useRef<FormRef>(null);

  const { loading, run, data = [] } = useRequest(getTableList, {
    manual: true,
    formatResult: ({ code, msg, data }) => {
      if (code !== 0) {
        return getRequestError('获取数据失败', msg);
      }
      return data;
    },
    onError: err => getRequestError('获取数据失败', err),
  });

  const onSubmit = (params: { [key: string]: any }) => run(params);

  const refresh = () => {
    if (filterRef.current) {
      filterRef.current.submit();
    }
  };

  const openForm = (data?: ExampleData) => {
    if (formRef.current) {
      formRef.current.open(data);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <PageHeaderWrapper
      title={false}
      content={
        <ExampleFilter ref={filterRef} loading={loading} onSubmit={onSubmit} />
      }
    >
      <ExampleTable
        loading={loading}
        dataSource={data}
        openForm={openForm}
        refresh={refresh}
      />
      <ExampleForm ref={formRef} refresh={refresh} />
    </PageHeaderWrapper>
  );
};

export default ExamplePage;
