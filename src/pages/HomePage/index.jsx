import React from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Card } from "antd";

const HomePage = () => {
  return (
    <PageHeaderWrapper>
      <Card className="page-card">
        <p>欢迎👏，开发文档及注意事项请查看👇</p>
        <a href="https://github.com/hanguihe/manage-system">
          <code>https://github.com/hanguihe/manage-system</code>
        </a>
      </Card>
    </PageHeaderWrapper>
  );
};

export default HomePage;
