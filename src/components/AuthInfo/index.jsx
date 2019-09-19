import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUserInfo } from "../../service/user";
import { clearUserInfo, setUserInfo } from "../../redux/user.redux";
import { Spin } from "antd";

const AuthInfo = ({
                    children,
                    history,
                    setUserInfo,
                    clearUserInfo,
                  }) => {
  const [loading, setLoading] = useState(true);

  // 校验用户身份有效性
  useEffect(() => {
    getUserInfo()
      .then((res) => {
        if (res.code === 0) {
          setUserInfo(res.data.userInfo);
          localStorage.setItem("token", res.data.token);
          setLoading(false);
        } else {
          localStorage.clear();
          clearUserInfo();
          setLoading(false);
          history.push("/login");
        }
      });
  }, []);


  const LoadingRender = () => (
    <Spin spinning={loading}>
      <div style={{ width: "100%", height: "100vh" }} />
    </Spin>
  );

  if (loading) {
    return <LoadingRender />;
  } else {
    return children;
  }
};

export default connect(
  state => state.user,
  { setUserInfo, clearUserInfo }
)(withRouter(AuthInfo));
