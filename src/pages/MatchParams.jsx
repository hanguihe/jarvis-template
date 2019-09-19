import React from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Card } from "antd";
import { withRouter } from "react-router-dom";

const MatchParams = ({ match }) => {
  return (
    <PageHeaderWrapper>
      <Card className="page-card">
        <p>hello,这里是路由传参界面</p>
        <p>当前页面参数为 {match.params.id} </p>
      </Card>
    </PageHeaderWrapper>
  );
};

export default withRouter(MatchParams);
