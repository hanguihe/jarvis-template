import React from 'react';
import { Button, Form, Icon, Input, message } from 'antd';
import logo from '@/assets/logo.svg';
import styles from './index.less';
import { authLogin } from '@/services/auth';
import { useAsync } from '@umijs/hooks';
import router from 'umi/router';
import { getRequestError } from '@/util/error';

const LoginPage = ({ form: { getFieldDecorator, validateFields } }) => {
  const { loading, run: loginSubmit } = useAsync(
    (account, password) => authLogin(account, password),
    [],
    {
      manual: true,
      onSuccess: ({ code, msg, data }) => {
        if (code === 0) {
          message.success('登录成功');
          localStorage.setItem('name', data.name);
          setTimeout(() => router.push('/'), 300);
        } else {
          getRequestError(msg);
        }
      },
      onError: err => getRequestError(err.toString()),
    },
  );

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log(values);
        const { account, password } = values;
        loginSubmit(account, password);
      }
    });
  };

  const { Item } = Form;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <img alt="logo" className={styles.logo} src={logo} />
            <span className={styles.title}>Jarvis</span>
          </div>
          <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
        </div>
        <div className={styles.form}>
          <Form onSubmit={handleSubmit}>
            <Item>
              {getFieldDecorator('account', { rules: [{ required: true, message: '请填写账号' }] })(
                <Input
                  placeholder="请输入账号"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />,
              )}
            </Item>
            <Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请填写账号' }],
              })(
                <Input.Password
                  placeholder="请输入密码"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />,
              )}
            </Item>
            <Item>
              <Button block type="primary" htmlType="submit" loading={loading}>
                登录
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Form.create()(LoginPage);
