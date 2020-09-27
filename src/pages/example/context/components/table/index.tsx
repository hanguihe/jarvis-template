import React, { useContext, useMemo } from 'react';
import { Button, Card, Divider, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useDeleteItem } from '../../useFetchData';
import { StoreContext } from '../../store';
import { columns as tableColumns } from '../column';

interface TableProps {
  loading: boolean;
  refresh: () => void;
  openForm: (type: string, data?: DataSource) => void;
}

export default (props: TableProps) => {
  const { loading, refresh, openForm } = props;
  const { dataSource } = useContext(StoreContext).state;

  const [onDelete] = useDeleteItem(refresh);

  const columns = useMemo<ColumnsType<DataSource>>(() => {
    return [
      ...tableColumns,
      {
        dataIndex: 'action',
        title: '操作',
        align: 'center',
        render: (text, row) => (
          <React.Fragment>
            <span
              className="action-text"
              onClick={() => openForm('update', row)}
            >
              编辑
            </span>
            <Divider type="vertical" />
            <span
              className="action-text danger"
              onClick={() => onDelete(row.id)}
            >
              删除
            </span>
          </React.Fragment>
        ),
      },
    ];
  }, [onDelete, openForm]);

  return useMemo(
    () => (
      <Card loading={loading}>
        <Row justify="end" style={{ marginBottom: 8 }}>
          <Button type="primary" onClick={() => openForm('new')}>
            新建
          </Button>
        </Row>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={dataSource}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            size: 'small',
          }}
        />
      </Card>
    ),
    [columns, dataSource, loading, openForm],
  );
};
