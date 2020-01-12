import React from 'react';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function CarInfo(props) {
  // console.log("this.props.carInfo",this.props.carInfo);
  return (<IceContainer className={styles.container}>
    <h3 className={styles.title}>车辆情况</h3>
    <ul>
      <li className={styles.userItem} >
        <div className={styles.userInfo}>
          <h6 className={styles.userName}>智驾状态：{props.carInfo.driveStatus}</h6>
          <h6 className={styles.userName}>避障触发：{props.carInfo.obstacleAvoid}</h6>
          <h6 className={styles.userName}>定位状态：{props.carInfo.locationStatus}</h6>
          <h6 className={styles.userName}>GPS状态：{props.carInfo.GPSStatus}</h6>
          <h6 className={styles.userName}>执行器故障：{props.carInfo.actuatorFailure}</h6>
          <h6 className={styles.userName}>传感器故障：{props.carInfo.sensorFailure}</h6>
          {/* <div>
              <span >车速：{props.carInfo.speed}</span>
              <span >
                <Switch className={styles.switch} defaultChecked={speed_status} onChange={onChange} size="small" />
              </span>
            </div> */}
        </div>
      </li>
    </ul>
  </IceContainer>);
}
