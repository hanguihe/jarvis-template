import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import moment from 'moment';
import {
  colFilterLayout,
  formItemLayout,
  MOMENT_FORMAT_DATE,
} from '@/utils/common';
import { selectFilter } from '@/utils/function';
import { StoreContext } from '../store';

interface ExampleProps {
  readonly loading: boolean;
  readonly onSubmit: (values: { [key: string]: any }) => void;
}

const { Item } = Form;
const { Option } = Select;

const ExampleFilter: React.FC<ExampleProps> = ({ loading, onSubmit }) => {
  const { state } = useContext(StoreContext);

  const [form] = Form.useForm();

  const onFinish = useCallback(
    (values: { [key: string]: any }) => {
      // 时间处理
      if (values.birthday) {
        values.birthday = moment(values.birthday).format(MOMENT_FORMAT_DATE);
      }
      if (values.born_date && values.born_date.length === 2) {
        values.born_date = [
          moment(values.born_date[0]).format(MOMENT_FORMAT_DATE),
          moment(values.born_date[1]).format(MOMENT_FORMAT_DATE),
        ];
      }
      onSubmit(values);
    },
    [onSubmit],
  );

  const onReset = useCallback(() => {
    form.resetFields();
    form.submit();
  }, [form]);

  useEffect(() => {
    if (state.refresh) {
      form.submit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, state.refresh]);

  return useMemo(
    () => (
      <Form
        form={form}
        onFinish={onFinish}
        {...formItemLayout}
        initialValues={{
          name: '宇智波',
          gender: [1, 2],
          born_date: [moment().add(-1, 'years'), moment()],
        }}
      >
        <Row>
          <Col {...colFilterLayout}>
            <Item label="名字" name="name">
              <Input />
            </Item>
          </Col>
          <Col {...colFilterLayout}>
            <Item label="性别" name="gender">
              <Select
                mode="multiple"
                showSearch={true}
                allowClear={true}
                filterOption={selectFilter}
              >
                <Option value={1}>男</Option>
                <Option value={2}>女</Option>
              </Select>
            </Item>
          </Col>
          <Col {...colFilterLayout}>
            <Item label="生日" name="birthday">
              <DatePicker style={{ width: '100%' }} />
            </Item>
          </Col>
          <Col {...colFilterLayout}>
            <Item label="出生日期" name="born_date">
              <DatePicker.RangePicker style={{ width: '100%' }} />
            </Item>
          </Col>
        </Row>
        <Row justify="end">
          <Button loading={loading} onClick={onReset}>
            重置
          </Button>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            style={{ marginLeft: 12 }}
          >
            查询
          </Button>
        </Row>
      </Form>
    ),
    [loading, form, onReset, onFinish],
  );
};

export default ExampleFilter;
