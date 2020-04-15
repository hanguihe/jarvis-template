import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useRequest } from '@umijs/hooks';
import { getTableList } from '@/services/api';
import { getRequestError } from '@/utils/function';
import Filter, { FilterRef } from './components/filter';
import ExampleTable from './components/table';
import ExampleForm, { FormRef } from './components/form';
import { ExampleData } from '@/pages/example/data';

const ExamplePage: React.FC = () => {
  const filter = useRef<FilterRef>(null);
  const formRef = useRef<FormRef>(null);

  const { loading, run, data = [] } = useRequest(getTableList, {
    formatResult: ({ code, msg, data }) => {
      if (code !== 0) {
        return getRequestError('获取数据失败', msg);
      }
      return data;
    },
    onError: err => getRequestError('获取数据失败', err),
  });

  const refresh = () => {
    return filter.current && filter.current.submit();
  };

  const openDrawer = (data: ExampleData) => {
    return formRef.current && formRef.current.open(data);
  };

  return (
    <PageHeaderWrapper
      title={false}
      content={<Filter ref={filter} loading={loading} onSubmit={run} />}
    >
      <ExampleTable
        loading={loading}
        dataSource={data}
        openDrawer={openDrawer}
        refresh={refresh}
      />
      <ExampleForm ref={formRef} refresh={refresh} />
    </PageHeaderWrapper>
  );
};

export default ExamplePage;
