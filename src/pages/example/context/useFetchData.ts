import { useCallback, useContext } from 'react';
import { useRequest } from 'ahooks';
import { message, Modal } from 'antd';
import { getRequestError } from '@/utils/functions';
import { StoreContext } from './store';

export function useDataList() {
  const { dispatch } = useContext(StoreContext);

  const { loading, run } = useRequest(
    (params) => ({
      url: '/api/query',
      method: 'POST',
      body: JSON.stringify(params),
    }),
    {
      onSuccess: ({ code, msg, data }) => {
        if (code === 0) {
          dispatch({
            type: 'set-data-list',
            payload: data,
          });
        } else {
          getRequestError('获取数据失败', msg);
        }
      },
      onError: (err) => getRequestError('获取数据失败', err),
    },
  );

  return { loading, refresh: run };
}

export function useDeleteItem(callback: () => void = () => {}) {
  const { run } = useRequest((id: number) => ({
    url: '/api/delete',
    method: 'DELETE',
    body: JSON.stringify({ id }),
  }));

  const onDelete = useCallback(
    (id: number) => {
      Modal.confirm({
        title: '确认要删除吗？',
        content: '删除后将无法恢复',
        okType: 'danger',
        onOk: () =>
          new Promise((resolve, reject) => {
            run(id)
              .then(({ code, msg }) => {
                if (code === 0) {
                  message.success('删除成功！');
                  callback();
                  return resolve();
                }
                getRequestError('删除失败', msg);
                return reject();
              })
              .catch((err) => {
                getRequestError('删除失败', err);
                return reject();
              });
          }),
      });
    },
    [callback, run],
  );

  return [onDelete];
}
