import React, { useCallback, useMemo } from 'react';
import { useRequest } from '@umijs/hooks';
import { createStore } from 'redux';
import { Provider, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getTableList } from '@/services/api';
import { getRequestError } from '@/utils/function';
import { ExampleFilter, ExampleForm, ExampleTable } from './components';
import { changeRefreshStatus, reducer } from './store';

const ExamplePage = () => {
  const { refresh } = useSelector(state => state, shallowEqual);
  const dispatch = useDispatch();

  const { loading, run, data = [] } = useRequest(getTableList, {
    manual: true,
    formatResult: ({ code, msg, data }) => {
      if (refresh) {
        dispatch(changeRefreshStatus());
      }
      if (code !== 0) {
        return getRequestError('获取数据失败', msg);
      }
      return data;
    },
    onError: err => getRequestError('获取数据失败', err),
  });

  const onSubmit = useCallback(params => run(params), [run]);

  return useMemo(
    () => (
      <PageHeaderWrapper
        title={false}
        content={<ExampleFilter loading={loading} onSubmit={onSubmit} />}
      >
        <ExampleTable loading={loading} dataSource={data} />
        <ExampleForm />
      </PageHeaderWrapper>
    ),
    [loading, onSubmit, data],
  );
};

export default () => {
  const store = createStore(reducer, composeWithDevTools());

  return (
    <Provider store={store}>
      <ExamplePage />
    </Provider>
  );
};
