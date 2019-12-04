import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Dropdown, Icon, Menu } from 'antd';
import { clearUserInfo } from '../../redux/user.redux';
import './index.less';

const UserContent = props => {
  const { userInfo } = props;
  const onMenuClick = ({ key }) => {
    switch (key) {
      case 'center':
        // TODO 跳转至用户中心
        break;
      case 'setting':
        // TODO 跳转至用户设置
        break;
      case 'logout':
        // TODO 退出登录
        localStorage.clear();
        props.clearUserInfo();
        break;
      default:
        break;
    }
  };

  const menuHeaderDropdown = (
    <Menu className="account-dropdown-menu" selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="center">
        <Icon type="user" />
        个人中心
      </Menu.Item>
      <Menu.Item key="settings">
        <Icon type="setting" />
        个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Icon type="logout" />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menuHeaderDropdown}>
      <span className="account-content">
        {userInfo.avatar && (
          <Avatar
            size="default"
            className="account-content-avatar"
            src={userInfo.avatar}
            alt="avatar"
          />
        )}
        <span className="account-content-name">{userInfo.name}</span>
      </span>
    </Dropdown>
  );
};

export default connect(state => state.user, { clearUserInfo })(UserContent);
