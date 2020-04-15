import React, { useCallback, useContext, useMemo } from 'react';
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
import { ColumnProps } from 'antd/es/table';
import { ExampleData } from '../data';
import { StoreContext } from '../store';
import { useRequest } from '@umijs/hooks';
import { deleteItem } from '@/services/api';
import { ExclamationCircleOutlined } from '@ant-design/icons/lib';
import { getRequestError } from '@/utils/function';

interface ExampleTableProps {
  readonly loading: boolean;
  readonly dataSource: Array<ExampleData>;
}

const ExampleTable: React.FC<ExampleTableProps> = ({ loading, dataSource }) => {
  const { dispatch } = useContext(StoreContext);

  const { run: insert } = useRequest(deleteItem, { manual: false });

  const onDelete = (id: number) => {
    Modal.confirm({
      title: '确认要删除吗？',
      content: '删除后将无法恢复',
      okType: 'danger',
      icon: <ExclamationCircleOutlined />,
      onOk: () =>
        new Promise((resolve, reject) => {
          insert(id)
            .then(({ code, msg }) => {
              if (code === 0) {
                message.success('删除成功！');
                dispatch({ type: 'refresh' });
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
  };

  const openDrawer = useCallback(
    (data?: ExampleData) => {
      dispatch({ type: 'open-drawer', payload: data || null });
    },
    [dispatch],
  );

  // 展开行
  const expandedRowRender = useCallback((row: ExampleData) => {
    const { skills } = row;
    return (
      <div>
        {skills.map(item => (
          <p key={item}>{item}</p>
        ))}
      </div>
    );
  }, []);

  // 统计信息
  const statisticInfo = useCallback(() => {
    let ages = 0;
    dataSource.forEach(item => {
      // do something...
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

  const columns: ColumnProps<ExampleData>[] = useMemo(
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
        render: (text: number) => text || '未知',
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
        onFilter: (text, row) =>
          typeof text === 'string' && row.attribute.includes(text),
      },
      {
        dataIndex: 'action',
        title: '操作',
        align: 'center',
        render: (_, row: ExampleData) => (
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
            onClick={() => openDrawer()}
          >
            新建
          </Button>
        </Row>
        {statisticInfo()}
        <Table
          rowKey="id"
          size="middle"
          expandable={{ expandedRowRender }}
          columns={columns}
          dataSource={dataSource}
        />
      </Card>
    ),
    [loading, dataSource],
  );
};

export default ExampleTable;
