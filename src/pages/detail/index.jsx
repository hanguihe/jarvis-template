import React, { useState } from 'react';
import { useAsync } from '@umijs/hooks';
import { withRouter } from 'umi';
import { getListDetail } from '@/services/list';
import { getRequestError } from '@/util/error';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';

const TableDetail = ({ match }) => {
  const [dataSource, setDataSource] = useState({});

  const { loading } = useAsync(() => getListDetail(), {
    onSuccess: ({ code, msg, data }) => {
      if (code === 0) {
        setDataSource(data);
      } else {
        getRequestError(msg);
      }
    },
    onError: err => getRequestError(err.toString()),
  });

  return (
    <PageHeaderWrapper>
      <Card loading={loading}>
        <p>传参页面，当前参数为：{match.params.id}</p>
        <code>{JSON.stringify(dataSource)}</code>
      </Card>
    </PageHeaderWrapper>
  );
};

export default withRouter(TableDetail);
