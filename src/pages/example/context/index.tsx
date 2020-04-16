import React, { useCallback, useContext, useMemo, useReducer } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useRequest } from '@umijs/hooks';
import { getTableList } from '@/services/api';
import { getRequestError } from '@/utils/function';
import { ExampleFilter, ExampleTable, ExampleForm } from './components';
import { initialState, reducer, StoreContext } from './store';

const ExamplePage: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);

  const { loading, run, data = [] } = useRequest(getTableList, {
    manual: true,
    formatResult: ({ code, msg, data }) => {
      if (state.refresh) {
        dispatch({ type: 'refresh' });
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

const ExampleProvider: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return useMemo(
    () => (
      <StoreContext.Provider value={{ state, dispatch }}>
        <ExamplePage />
      </StoreContext.Provider>
    ),
    [state, dispatch],
  );
};

export default ExampleProvider;
