import React from 'react';
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
import { ExclamationCircleOutlined } from '@ant-design/icons/lib';
import { useRequest } from '@umijs/hooks';
import { deleteItem } from '@/services/api';
import { getRequestError } from '@/utils/function';
import { ExampleData } from '../../data';

interface ExampleTableProps {
  readonly loading: boolean;
  readonly dataSource: Array<ExampleData>;
  readonly openForm: (data?: ExampleData) => void;
  readonly refresh: () => void;
}

const ExampleTable: React.FC<ExampleTableProps> = ({
  loading,
  dataSource,
  openForm,
  refresh,
}) => {
  const { run } = useRequest(deleteItem, { manual: true });
  const onDelete = (id: number) => {
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
                refresh();
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

  // 展开行
  const expandedRowRender = (row: ExampleData) => {
    const { skills } = row;
    return (
      <div>
        {skills.map(item => (
          <p key={item}>{item}</p>
        ))}
      </div>
    );
  };

  // 统计信息
  const statisticInfo = () => {
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
  };

  const columns: ColumnProps<ExampleData>[] = [
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
          <Button type="link" size="small" onClick={() => openForm(row)}>
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
  ];

  return (
    <Card loading={loading}>
      <Row justify="end" style={{ marginBottom: 6 }}>
        <Button>导出</Button>
        <Button
          type="primary"
          style={{ marginLeft: 12 }}
          onClick={() => openForm()}
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
  );
};

export default ExampleTable;
