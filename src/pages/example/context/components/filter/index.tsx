import React, { useCallback, useContext, useEffect } from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import moment, { Moment } from 'moment';
import {
  COL_FILTER_LAYOUT,
  FORM_ITEM_LAYOUT,
  MOMENT_FORMAT_DATE,
} from '@/utils/common';
import { selectFilter } from '@/utils/functions';
import { StoreContext } from '@/pages/example/context/store';

interface FilterProps {
  readonly loading: boolean;
  readonly onSubmit: (values: any) => void;
}

const { Item } = Form;
const { Option } = Select;
const initialValues = {
  name: '宇智波',
  gender: [1, 2],
  born_date: [moment().add(-1, 'years'), moment()],
};

export default (props: FilterProps) => {
  const { loading, onSubmit } = props;
  const {
    state: { refresh },
  } = useContext(StoreContext);

  const [form] = Form.useForm();

  const onReset = useCallback(() => {
    form.resetFields();
    form.submit();
  }, [form]);

  const onFinish = useCallback(
    (values) => {
      const data = {
        ...values,
        birthday: moment(values.birthday).format(MOMENT_FORMAT_DATE),
        bornDate: values.bornDate
          ? values.bornDate.map((item: Moment) =>
              moment(item).format(MOMENT_FORMAT_DATE),
            )
          : [],
      };

      onSubmit(data);
    },
    [onSubmit],
  );

  useEffect(() => {
    if (refresh) {
      form.submit();
    }
  }, [refresh, form]);

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      {...FORM_ITEM_LAYOUT}
    >
      <Row>
        <Col {...COL_FILTER_LAYOUT}>
          <Item label="名字" name="name">
            <Input />
          </Item>
        </Col>
        <Col {...COL_FILTER_LAYOUT}>
          <Item label="性别" name="gender">
            <Select
              mode="multiple"
              showSearch
              allowClear
              filterOption={selectFilter}
            >
              <Option value={1}>男</Option>
              <Option value={2}>女</Option>
            </Select>
          </Item>
        </Col>
        <Col {...COL_FILTER_LAYOUT}>
          <Item label="生日" name="birthday">
            <DatePicker style={{ width: '100%' }} />
          </Item>
        </Col>
        <Col {...COL_FILTER_LAYOUT}>
          <Item label="出生日期" name="bornDate">
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
  );
};
