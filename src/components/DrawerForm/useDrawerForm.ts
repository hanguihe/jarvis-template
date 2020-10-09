import { Form } from 'antd';
import { useCallback, useState } from 'react';

export function useDrawerForm() {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const onClose = useCallback(() => {
    setVisible(false);
    form.resetFields();
  }, [form]);

  const onOpen = useCallback(
    (values) => {
      form.setFieldsValue({ ...values });
      setVisible(values);
    },
    [form],
  );

  return {
    open: onOpen,
    close: onClose,
    reset: () => {
      form.resetFields();
    },
    form,
  };
}
