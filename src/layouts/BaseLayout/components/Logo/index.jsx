import React from 'react';
import styles from './index.module.scss';

export default function Logo() {
  return (
    <div className={styles.logo}>
      {/* <span className={styles.brand}>LOGO</span> */}
      <img src={require('../../../../../public/logo.jpg')}
        width={150}
        height={44}
        alt="" />
      {/* <div className={styles.workbench}>
        设备管理
         <br />
        工作台
       </div> */}
    </div>
  );
}
