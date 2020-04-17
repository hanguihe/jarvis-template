import React, { useCallback, useMemo } from 'react';
import { useRequest } from '@umijs/hooks';
import {
  Alert,
  Button,
  Card,
  Divider,
  message,
  Modal,
  Row,
  Table,
  Tag,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { getRequestError } from '@/utils/function';
import { deleteItem } from '@/services/api';
import { changeRefreshStatus, openDrawerForm } from '../store';

const ExampleTable = ({ loading, dataSource }) => {
  const dispatch = useDispatch();

  // 删除
  const { run } = useRequest(deleteItem, { manual: true });

  const onDelete = useCallback(
    id => {
      Modal.confirm({
        title: '确认要删除吗？',
        content: '删除后将无法恢复',
        okType: 'danger',
        icon: <ExclamationCircleOutlined />,
        onOk: () =>
          new Promise((resolve, reject) => {
            run(id)
              .then(({ code, msg }) => {
                if (code === 0) {
                  message.success('删除成功！');
                  dispatch(changeRefreshStatus());
                  return resolve();
                } else {
                  getRequestError('删除失败', msg);
                  return reject();
                }
              })
              .catch(err => {
                getRequestError('删除失败', err);
                return reject();
              });
          }),
      });
    },
    [run],
  );

  const expandedRowRender = useCallback(row => {
    const { skills } = row;
    return (
      <div>
        {skills.map(item => (
          <p key={item}>{item}</p>
        ))}
      </div>
    );
  }, []);

  const statisticInfo = useCallback(() => {
    let ages = 0;
    dataSource.forEach(item => {
      ages += item.age;
    });

    return (
      <Alert
        message={
          <div>
            共{' '}
            <Tag color="magenta" style={{ margin: 0 }}>
              {dataSource.length}
            </Tag>{' '}
            条数据， 总年龄：
            <Tag color="magenta">{ages}</Tag>
          </div>
        }
      />
    );
  }, [dataSource]);

  const openDrawer = useCallback(
    data => {
      console.log(1);
      dispatch(openDrawerForm(data));
    },
    [dispatch],
  );

  const columns = useMemo(
    () => [
      {
        dataIndex: 'name',
        title: '名字',
        align: 'center',
      },
      {
        dataIndex: 'gender',
        title: '性别',
        align: 'center',
      },
      {
        dataIndex: 'age',
        title: '年龄',
        align: 'center',
        sorter: (a, b) => a.age - b.age,
        defaultSortOrder: 'ascend',
        render: text => text || '未知',
      },
      {
        dataIndex: 'blood',
        title: '血型',
        align: 'center',
      },
      {
        dataIndex: 'birthday',
        title: '生日',
        align: 'center',
      },
      {
        dataIndex: 'height-weight',
        title: '身高/体重',
        align: 'center',
        render: (text, row) => `${row.height} / ${row.weight}`,
      },
      {
        dataIndex: 'character',
        title: '性格',
        align: 'center',
      },
      {
        dataIndex: 'attribute',
        title: '查克拉属性',
        align: 'center',
        filters: [
          { text: '风', value: '风' },
          { text: '火', value: '火' },
          { text: '雷', value: '雷' },
        ],
        onFilter: (text, row) => row.attribute.includes(text),
      },
      {
        dataIndex: 'action',
        title: '操作',
        align: 'center',
        render: (text, row) => (
          <div>
            <Button type="link" size="small" onClick={() => openDrawer(row)}>
              编辑
            </Button>
            <Divider type="vertical" />
            <Button
              type="link"
              size="small"
              danger={true}
              onClick={() => onDelete(row.id)}
            >
              删除
            </Button>
          </div>
        ),
      },
    ],
    [openDrawer, onDelete],
  );

  return useMemo(
    () => (
      <Card loading={loading}>
        <Row justify="end" style={{ marginBottom: 6 }}>
          <Button>导出</Button>
          <Button
            type="primary"
            style={{ marginLeft: 12 }}
            onClick={() => openDrawer(null)}
          >
            新建
          </Button>
        </Row>
        {statisticInfo()}
        <Table
          size="middle"
          rowKey="id"
          expandable={{ expandedRowRender }}
          columns={columns}
          dataSource={dataSource}
        />
      </Card>
    ),
    [
      loading,
      columns,
      dataSource,
      expandedRowRender,
      statisticInfo,
      openDrawer,
    ],
  );
};

export default ExampleTable;
