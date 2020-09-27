import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';

export default () => {
  return (
    <PageContainer>
      <Card>
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
            href="https://github.com/hanguihe/jarvis-template"
            target="_blank"
            rel="noopener noreferrer"
          >
            <code>https://github.com/hanguihe/jarvis-template</code>
          </a>
        </p>
      </Card>
    </PageContainer>
  );
};
