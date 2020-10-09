import React, { useCallback, useMemo, useState } from 'react';
import { Button, Drawer, Form, Row } from 'antd';

const defaultProps = {
  title: '新建表单',
  render: <Button type="primary">新建表单</Button>,
  width: 500,
};

export type DrawerFromProps = {
  onFinish?: (values: any) => void;
} & Partial<typeof defaultProps>;

/**
 * 需要对外暴露的hooks
 * open：打开表单
 * close: 关闭表单
 * reset: 重置表单
 * form: form属性
 */
const DrawerForm: React.FC<DrawerFromProps> = ({ title, width, render, onFinish, children }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  const onSubmit = useCallback(async () => {
    const values = await form.validateFields();
    if (values && typeof onFinish === 'function') {
      onFinish(values);
    }
  }, [form, onFinish]);

  const actionRender = useMemo(() => {
    return <span onClick={() => setVisible(true)}>{render}</span>;
  }, [render]);

  const footer = useMemo(
    () => (
      <Row justify="end">
        <Button onClick={onClose}>取消</Button>
        <Button style={{ marginLeft: 12 }} type="primary" onClick={onSubmit}>
          提交
        </Button>
      </Row>
    ),
    [onClose, onSubmit],
  );

  return (
    <React.Fragment>
      {actionRender}
      <Drawer visible={visible} title={title} width={width} onClose={onClose} footer={footer}>
        <Form style={{ padding: '0 24px' }} form={form} onFinish={onFinish}>
          {children}
        </Form>
      </Drawer>
    </React.Fragment>
  );
};

DrawerForm.defaultProps = defaultProps;

export default DrawerForm;
