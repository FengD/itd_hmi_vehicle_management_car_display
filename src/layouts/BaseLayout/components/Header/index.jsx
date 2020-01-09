import React, { useEffect, useState } from 'react';
import Layout from '@icedesign/layout';
import { Icon, Balloon, Nav, Message } from '@alifd/next';
import { Link, withRouter } from 'react-router-dom';
import { asideMenuConfig } from '@/config/menu.js';
import Logo from '../Logo';
import styles from './index.module.scss';

import stores from '@/stores/index';
import { useRequest } from '@/utils/request';
import { logout } from '@/config/dataSource';

import FoundationSymbol from '@icedesign/foundation-symbol';
import { FormattedMessage, injectIntl } from 'react-intl';

function Header(props) {
  const { request } = useRequest(logout);

  function getLocaleKey(item) {
    return `app.header.${item.name}`;
  }

  function handleSetting() {
    props.history.push('/account/setting');
  }

  async function handleLogout() {
    try {
      await request();
      Message.success('已登出');
      localStorage.removeItem('loginStatus');
      localStorage.removeItem('carId');
      localStorage.removeItem('token');
      props.history.push('/user/login');
    } catch (err) {
      localStorage.removeItem('loginStatus');
      localStorage.removeItem('carId');
      localStorage.removeItem('token');
      Message.error('登出失败');
      console.error("handleLogoutErr", err);
    }
  }

  //carProfile
  // var initialCarProfile = "260";
  // const [carProfileState, setCarProfileState] = use
  const carProfile = stores.useStore('carProfile');
  const { carinfo, fetchData } = carProfile;
  // const { name } = carinfo["car_name"];
  const { name } = "260";
  // const { toggle } = expandAside;

  useEffect(() => {
    fetchData();
  }, []);

  function getSelectKeys() {
    const selectKeys = props.location.pathname.split('/').filter(i => i);
    if (selectKeys.length === 0) {
      selectKeys.push('home');
    }
    return selectKeys;
  }

  function renderUser() {
    const trigger = (
      <div className={styles.headerUserpannel}>
        <img
          src="https://img.alicdn.com/tfs/TB1FJSxwMHqK1RjSZFgXXa7JXXa-80-80.png"
          alt=""
          className={styles.userAvatar}
        />
        <span className={styles.userName}>
          {name}
          <Icon className={styles.headerArrow} size="xs" type="arrow-down" />
        </span>
      </div>
    );

    return (
      <Balloon
        triggerType="click"
        trigger={trigger}
        align="br"
        alignEdge
        closable={false}
        className={styles.headerBalloon}
        style={{ width: '80px' }}
      >
        <div className={styles.personalMenu} onClick={handleLogout}>
          <Link to="/user/login">退出</Link>
        </div>
      </Balloon>
    );
  }

  function renderHeader() {
    const selectedKeys = getSelectKeys();

    return (
      <div className={styles.adminLayoutHeader}>
        <Logo />
        {asideMenuConfig && asideMenuConfig.length > 0 ? (
          <Nav direction="hoz" type="secondary" selectedKeys={selectedKeys}>
            {asideMenuConfig.map((nav) => {
              return (
                <Nav.Item key={nav.path.replace(/\//g, '') || 'home'}>
                  <Link to={nav.path}>{nav.name}</Link>
                </Nav.Item>
              );
            })}
          </Nav>
        ) : null}
        {renderUser()}
      </div>
    );
  }

  return (
    <Layout.Header type="secondary">{renderHeader()}</Layout.Header>
  );
}

export default withRouter(Header);