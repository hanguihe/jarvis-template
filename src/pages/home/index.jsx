import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';

const HomePage = () => {
  return (
    <PageHeaderWrapper>
      <Card className="page-card">
        <p>
          欢迎
          <span role="img" aria-label="鼓掌">
            👏
          </span>
          ，开发文档及注意事项请查看
          <span role="img" aria-label="下面">
            👇
          </span>
        </p>
        <p>
          <a
            href="https://github.com/hanguihe/manage-system"
            target="_blank"
            rel="noopener noreferrer"
          >
            <code>https://github.com/hanguihe/manage-system</code>
          </a>
        </p>
      </Card>
    </PageHeaderWrapper>
  );
};

export default HomePage;
