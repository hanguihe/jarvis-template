import React, { Component, ErrorInfo } from 'react';
import { history } from 'umi';
import { Button, Result } from 'antd';

/**
 * 错误提示避免白屏
 */
class ErrorBoundary extends Component {
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  state = {
    hasError: false,
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    // 捕捉到页面异常，日志错误上报等操作
    console.error('捕捉到页面异常', error, info);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <Result
          status="500"
          title="500"
          subTitle="抱歉，系统出现异常，请联系 @系统管理员 或稍后再试"
          extra={
            <Button type="primary" onClick={() => history.goBack()}>
              返回上一页
            </Button>
          }
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
