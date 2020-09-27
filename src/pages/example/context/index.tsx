import React, { useCallback, useContext, useMemo, useReducer } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { initialState, StoreContext, reducer } from './store';
import { useDataList } from './useFetchData';
import { ExampleFilter, ExampleTable, ExampleDrawer } from './components';

const ExamplePage = () => {
  const { dispatch } = useContext(StoreContext);

  const { loading, refresh } = useDataList();

  const onSubmit = useCallback(
    (params) => {
      refresh(params);
    },
    [refresh],
  );

  const reFetchData = useCallback(() => {
    dispatch({ type: 're-fetch-data' });
  }, [dispatch]);

  const openForm = useCallback(
    (type: string, data?: DataSource) => {
      dispatch({
        type: 'open-form',
        payload: {
          type,
          data,
        },
      });
    },
    [dispatch],
  );

  return useMemo(
    () => (
      <PageContainer
        title={false}
        content={<ExampleFilter loading={loading} onSubmit={onSubmit} />}
      >
        <ExampleTable
          loading={loading}
          refresh={reFetchData}
          openForm={openForm}
        />
        <ExampleDrawer />
      </PageContainer>
    ),
    [loading, onSubmit, openForm, reFetchData],
  );
};

export default () => {
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
