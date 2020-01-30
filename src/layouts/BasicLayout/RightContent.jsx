import React from 'react';
import { Menu, Icon, Dropdown } from 'antd';
import router from 'umi/router';
import styles from './index.less';

const RightContent = () => {
  const onMenuClick = ({ key }) => {
    switch (key) {
      case 'logout':
        localStorage.clear();
        router.push('/login');
        break;
      default:
        break;
    }
  };

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="logout">
        <Icon type="logout" />
        退出登录
      </Menu.Item>
    </Menu>
  );

  const name = localStorage.getItem('name');

  return (
    <Dropdown overlay={menuHeaderDropdown} className={styles.account}>
      <span className="name">{name}</span>
    </Dropdown>
  );
};

export default RightContent;
