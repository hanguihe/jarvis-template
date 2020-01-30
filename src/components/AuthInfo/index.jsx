import React from 'react';
import router from 'umi/router';
import { useAsync } from '@umijs/hooks';
import { getUserInfo } from '@/services/auth';
import { getRequestError } from '@/util/error';
import Loading from './loading';
/**
 * 获取用户信息校验是否具有登录状态
 */
const AuthInfo = ({ children }) => {
  const { loading } = useAsync(() => getUserInfo(), [], {
    onSuccess: ({ code, msg, data }) => {
      if (code === 0) {
        // TODO redux || dva 等数据流存储用户信息
        localStorage.setItem('name', data.name);
      } else {
        getRequestError(msg, () => {
          // TODO 信息获取失败处理
          router.push('/login');
        });
      }
    },
    onError: err =>
      getRequestError(err.toString(), () => {
        // TODO 信息获取失败处理
        router.push('/login');
      }),
  });

  const styles = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  if (loading) {
    return (
      <div style={styles}>
        <Loading />
      </div>
    );
  }

  return children;
};

export default AuthInfo;
