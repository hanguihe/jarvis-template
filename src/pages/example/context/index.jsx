import React, { useCallback, useContext, useMemo, useReducer } from 'react';
import { useRequest } from '@umijs/hooks';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getTableList } from '@/services/api';
import { getRequestError } from '@/utils/function';
import {
  CHANGE_REFRESH_STATUS,
  initialState,
  reducer,
  StoreContext,
} from './store';
import { ExampleFilter, ExampleForm, ExampleTable } from './components';

const ExamplePage = () => {
  const {
    state: { refresh },
    dispatch,
  } = useContext(StoreContext);

  const { loading, run, data = [] } = useRequest(getTableList, {
    manual: true,
    formatResult: ({ code, msg, data }) => {
      if (refresh) {
        dispatch({ type: CHANGE_REFRESH_STATUS });
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

const Provider = () => {
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

export default Provider;
