import React from 'react';
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
