import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRequest } from '@umijs/hooks';
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
import moment from 'moment';
import { formItemLayout, MOMENT_FORMAT_DATE } from '@/utils/common';
import { getRequestError, selectFilter } from '@/utils/function';
import { insertData, updateData } from '@/services/api';
import { StoreContext } from '../store';
import { ExampleResponse } from '../data';

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

const ExampleForm = () => {
  const {
    state: { modalVisible, currentData },
    dispatch,
  } = useContext(StoreContext);

  const [form] = Form.useForm();

  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const title = useMemo(() => (currentData ? '更新' : '新建'), [currentData]);

  const onClose = useCallback(
    (isRefresh: boolean | undefined) => {
      form.resetFields();
      dispatch({ type: 'close-modal', payload: !!isRefresh });
    },
    [dispatch, form],
  );

  const responseOptions = useMemo(
    () => ({
      manual: true,
      onSuccess: ({ code, msg }: ExampleResponse) => {
        setConfirmLoading(false);
        if (code === 0) {
          message.success(`${title}表单成功！`);
          return onClose(true);
        }
        getRequestError(`${title}表单失败`, msg);
      },
      onError: (err: Error) => {
        setConfirmLoading(false);
        getRequestError(`${title}表单失败`, err);
      },
    }),
    [title, onClose],
  );

  const { run: insert } = useRequest(insertData, {
    ...responseOptions,
  });

  const { run: update } = useRequest(updateData, {
    ...responseOptions,
  });

  const onFinish = useCallback(
    (values: { [key: string]: any }) => {
      const data = JSON.parse(JSON.stringify(values));
      if (!data.skills || data.skills.length === 0) {
        return message.error('技能不能为空');
      }
      setConfirmLoading(true);
      if (data.birthday) {
        data.birthday = moment(data.birthday).format(MOMENT_FORMAT_DATE);
      }
      if (currentData) {
        return update({ ...data, id: currentData.id });
      }
      return insert({ ...data });
    },
    [currentData, insert, update],
  );

  useEffect(() => {
    if (currentData) {
      const { name, skills } = currentData;
      form.setFieldsValue({ name, skills });
    }
  }, [currentData, form]);

  return useMemo(
    () => (
      <Drawer
        title={title}
        visible={modalVisible}
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
    ),
    [modalVisible, title, onClose, onFinish, confirmLoading, form],
  );
};

export default ExampleForm;
