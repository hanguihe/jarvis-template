import React, { useCallback } from 'react';
import { Button, Card, Form, Input } from 'antd';
import DrawerForm from '../components/DrawerForm';

const { Item } = Form;

const TestPage = () => {
  const onFinish = useCallback((values) => {
    console.log(values);
  }, []);

  return (
    <Card>
      <DrawerForm
        title="表单"
        render={<Button type="primary">新建表单</Button>}
        onFinish={onFinish}
      >
        <Item name="name" label="名字" rules={[{ required: true, message: '请填写名字' }]}>
          <Input autocomplete="off" />
        </Item>
      </DrawerForm>
    </Card>
  );
};

export default TestPage;
