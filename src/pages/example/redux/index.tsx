import React, { useCallback, useMemo } from 'react';
import { Provider, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useRequest } from '@umijs/hooks';
import { getTableList } from '@/services/api';
import { getRequestError } from '@/utils/function';
import { State, changeRefresh, reducer } from './store';
import { ExampleFilter, ExampleForm, ExampleTable } from './components';

const ExamplePage = () => {
  const { refresh } = useSelector(
    (state: State) => ({ refresh: state.refresh }),
    shallowEqual,
  );

  const dispatch = useDispatch();

  const { loading, run, data = [] } = useRequest(getTableList, {
    manual: true,
    formatResult: ({ code, msg, data }) => {
      if (refresh) {
        dispatch(changeRefresh());
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
    [loading, data, onSubmit],
  );
};

export default () => {
  const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV === 'development',
  });

  return (
    <Provider store={store}>
      <ExamplePage />
    </Provider>
  );
};
