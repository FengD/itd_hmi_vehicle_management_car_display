import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

export default function Logo() {
  return (
    <div  className={styles.logo}>
      <span className={styles.brand}>LOGO</span>
      <div className={styles.workbench}>
        设备管理
        <br />
        工作台
      </div>
    </div>
  );
}
