import React from "react";
import { Layout } from "antd";
import logo from "../../assets/images/logo.svg";

const DefaultFooter = () => {
  const { Footer } = Layout;

  return (
    <Footer style={{ textAlign: "center", padding: "15px 50px 25px 50px" }}>
      <div style={{ fontSize: 16, lineHeight: "25px" }}>
        Template
        <img
          src={logo}
          alt=""
          style={{ width: 25, height: 25, margin: "0 20px" }}
        />
        WhatTheHan
      </div>
      Copyright ©2019 WhatTheHan Created by Han.
    </Footer>
  );
};

export default DefaultFooter;
