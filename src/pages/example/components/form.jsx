import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
} from 'antd';
import { formItemLayout, MOMENT_FORMAT_DATE } from '@/utils/common';
import { getRequestError, selectFilter } from '@/utils/function';
import moment from 'moment';
import { useRequest } from '@umijs/hooks';
import { insertData, updateData } from '@/services/api';

const { Item } = Form;
const { Option } = Select;

const bloodEnum = [
  { id: 0, name: '未知' },
  { id: 1, name: 'O型' },
  { id: 2, name: 'A型' },
  { id: 3, name: 'AB型' },
];

const attributeEnum = [
  { id: 1, name: '风' },
  { id: 2, name: '雷' },
  { id: 3, name: '火' },
  { id: 4, name: '土' },
  { id: 5, name: '水' },
  { id: 6, name: '阴' },
  { id: 7, name: '阳' },
];

const ExampleForm = forwardRef(({ refresh }, ref) => {
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dataSource, setDataSource] = useState({});

  const responseOptions = {
    manual: true,
    onSuccess: ({ code, msg }) => {
      setConfirmLoading(false);
      if (code === 0) {
        message.success(`${title}表单成功！`);
        return onClose(true);
      }
      getRequestError(`${title}表单失败`, msg);
    },
    onError: err => {
      setConfirmLoading(false);
      getRequestError(`${title}表单失败`, err);
    },
  };

  const { run: insert } = useRequest(insertData, {
    ...responseOptions,
  });

  const { run: update } = useRequest(updateData, {
    ...responseOptions,
  });

  const onClose = isRefresh => {
    setVisible(false);
    setDataSource({});
    form.resetFields();

    if (isRefresh) {
      refresh();
    }
  };

  const onFinish = values => {
    const data = JSON.parse(JSON.stringify(values));
    if (!data.skills || data.skills.length === 0) {
      return message.error('技能不能为空');
    }
    setConfirmLoading(true);
    if (data.birthday) {
      data.birthday = moment(data.birthday).format(MOMENT_FORMAT_DATE);
    }
    if (dataSource.id) {
      return update({ ...data, id: dataSource.id });
    }
    return insert({ ...data });
  };

  useImperativeHandle(ref, () => ({
    open(data) {
      setVisible(true);
      if (data) {
        setDataSource(data);
        // 初始化表单
        form.setFieldsValue({
          name: data.name,
          skills: data.skills,
        });
      }
    },
  }));

  const title = dataSource.id ? '更新' : '新建';

  return (
    <Drawer
      title={title}
      visible={visible}
      width={800}
      forceRender={true}
      onClose={() => onClose(false)}
      footer={
        <Row justify="end">
          <Button loading={confirmLoading} onClick={() => onClose(false)}>
            取消
          </Button>
          <Button
            loading={confirmLoading}
            type="primary"
            onClick={() => form.submit()}
            style={{ marginLeft: 12 }}
          >
            提交
          </Button>
        </Row>
      }
    >
      <Form
        form={form}
        onFinish={onFinish}
        style={{ paddingRight: 100 }}
        {...formItemLayout}
        initialValues={{
          gender: 1,
          age: 18,
          blood: 1,
          weight: 0,
          height: 0,
          skills: [],
        }}
      >
        <Item
          label="名字"
          name="name"
          rules={[{ required: true, message: '请填写名称' }]}
        >
          <Input />
        </Item>
        <Item
          label="性别"
          name="gender"
          rules={[{ required: true, message: '请选择性别' }]}
        >
          <Select
            showSearch={true}
            allowClear={true}
            filterOption={selectFilter}
          >
            <Option value={1}>男</Option>
            <Option value={2}>女</Option>
          </Select>
        </Item>
        <Item label="年龄" name="age">
          <InputNumber min={0} />
        </Item>
        <Item
          label="血型"
          name="blood"
          rules={[{ required: true, message: '请选择血型' }]}
        >
          <Select
            showSearch={true}
            allowClear={true}
            filterOption={selectFilter}
          >
            {bloodEnum.map(({ id, name }) => (
              <Option key={id} value={id}>
                {name}
              </Option>
            ))}
          </Select>
        </Item>
        <Item label="生日" name="birthday">
          <DatePicker />
        </Item>
        <Item label="身高" name="height">
          <InputNumber min={0} formatter={value => `${value} CM`} />
        </Item>
        <Item label="体重" name="weight">
          <InputNumber min={0} formatter={value => `${value} KG`} />
        </Item>
        <Item label="性格" name="character">
          <Input.TextArea autoSize />
        </Item>
        <Item label="查克拉属性" name="attribute">
          <Select
            mode="multiple"
            showSearch={true}
            allowClear={true}
            filterOption={selectFilter}
          >
            {attributeEnum.map(({ id, name }) => (
              <Option key={id} value={id}>
                {name}
              </Option>
            ))}
          </Select>
        </Item>
        <Item label="技能" required={true}>
          <Form.List name="skills">
            {(fields, { add, remove }) => (
              <Row gutter={12} align="top">
                {fields.map((item, index) => (
                  <React.Fragment key={item.key}>
                    <Col span={18}>
                      <Item name={[index]}>
                        <Input />
                      </Item>
                    </Col>
                    <Col span={4}>
                      <Button
                        size="small"
                        type="danger"
                        ghost={true}
                        onClick={() => remove(item.name)}
                      >
                        移除
                      </Button>
                    </Col>
                  </React.Fragment>
                ))}
                <Col span={24}>
                  <Button
                    size="small"
                    type="primary"
                    ghost={true}
                    onClick={() => add()}
                  >
                    添加一行
                  </Button>
                </Col>
              </Row>
            )}
          </Form.List>
        </Item>
      </Form>
    </Drawer>
  );
});

export default ExampleForm;
