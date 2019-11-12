import React from 'react';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

const TOP_USERS = [
  {
    name: 'car1',
    title: '111',
    avatar:
      'https://img.alicdn.com/tfs/TB19Erpw4TpK1RjSZFKXXa2wXXa-150-150.jpg',
  },
  {
    name: 'car2',
    title: '222',
    avatar:
      'https://img.alicdn.com/tfs/TB1w5jvw4TpK1RjSZFMXXbG_VXa-200-200.png',
  },
  {
    name: 'car',
    title: '333',
    avatar:
      'https://img.alicdn.com/tfs/TB1zenmwYPpK1RjSZFFXXa5PpXa-200-200.png',
  },
  {
    name: 'car4',
    title: '444',
    avatar:
      'https://img.alicdn.com/tfs/TB1n4rxwZfpK1RjSZFOXXa6nFXa-200-200.png',
  },
  {
    name: 'car5',
    title: '555',
    avatar:
      'https://img.alicdn.com/tfs/TB19Erpw4TpK1RjSZFKXXa2wXXa-150-150.jpg',
  },
];

export default function Users() {
  return (
    <IceContainer className={styles.container}>
      <h3 className={styles.title}>车辆情况</h3>
      <ul>
        {TOP_USERS.map((user, index) => {
          return (
            <li className={styles.userItem} key={index}>
              <img src={user.avatar} alt="" className={styles.userAvatar} />
              <div className={styles.userInfo}>
                <h6 className={styles.userName}>{user.name}</h6>
                <p className={styles.userTitle}>{user.title}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </IceContainer>
  );
}
