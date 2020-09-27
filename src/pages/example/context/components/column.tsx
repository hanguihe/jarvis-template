import React from 'react';
import { ColumnsType } from 'antd/es/table';

export const columns: ColumnsType<DataSource> = [
  {
    dataIndex: 'name',
    title: '名字',
    align: 'center',
  },
  {
    dataIndex: 'age',
    title: '年龄',
    align: 'center',
  },
  {
    dataIndex: 'gender',
    title: '性别',
    align: 'center',
  },
  {
    dataIndex: 'height-weight',
    title: '身高/体重',
    align: 'center',
    render: (_, { height, weight }) => `${height}/${weight}`,
  },
  {
    dataIndex: 'birthday',
    title: '生日',
    align: 'center',
  },
  {
    dataIndex: 'blood',
    title: '血型',
    align: 'center',
  },
  {
    dataIndex: 'character',
    title: '性格',
    align: 'center',
  },
  {
    dataIndex: 'skills',
    title: '技能',
    align: 'center',
    render: (text: string[]) => {
      return text.map((item) => <p key={item}>{item}</p>);
    },
  },
];
