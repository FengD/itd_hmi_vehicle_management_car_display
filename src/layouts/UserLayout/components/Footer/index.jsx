import React from 'react';
import styles from './index.module.scss';

export default () => {
  return (
    <div className={styles.footer}>
      {/* <div className={styles.links}>
        <a href="#" className={styles.link}>
          帮助
        </a>
        <a href="#" className={styles.link}>
          隐私
        </a>
        <a href="#" className={styles.hb}>
          条款
        </a>
      </div> */}
      <div className={styles.copyright}>恒润科技 © 2019 版权所有</div>
    </div>
  );
};
