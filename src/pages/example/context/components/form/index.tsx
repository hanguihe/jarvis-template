import React, { useCallback, useContext, useMemo } from 'react';
import { StoreContext } from '@/pages/example/context/store';
import { DatePicker, Drawer, Form, Input, InputNumber } from 'antd';

const { Item } = Form;

export default () => {
  const {
    state: { visible, formType, currentData },
    dispatch,
  } = useContext(StoreContext);

  const onClose = useCallback(() => {
    dispatch({ type: 'close-form' });
  }, [dispatch]);

  const title = useMemo(() => {
    if (formType === 'new') {
      return '新建表单';
    }
    return '更新表单';
  }, [formType]);

  return (
    <Drawer
      visible={visible}
      width={600}
      title={title}
      onClose={onClose}
      forceRender
    >
      <Form>
        <Item name="name" label="名称">
          <Input />
        </Item>
        <Item name="age" label="年龄">
          <InputNumber />
        </Item>
        <Item name="birthday" label="生日">
          <DatePicker />
        </Item>
      </Form>
    </Drawer>
  );
};
