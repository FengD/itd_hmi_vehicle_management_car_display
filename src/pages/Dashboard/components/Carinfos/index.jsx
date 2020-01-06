import React, { useEffect } from 'react';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default class Carinfo extends React.Component {

  render(){
    console.log("this.props.carinfo",this.props.carinfo);
    return (<IceContainer className={styles.container}>
      <h3 className={styles.title}>车辆情况</h3>
      <ul>
        <li className={styles.userItem} >
          <div className={styles.userInfo}>
            <h6 className={styles.userName}>智驾状态：{this.props.carinfo.driveStatus}</h6>
            <h6 className={styles.userName}>避障触发：{this.props.carinfo.obstacleAvoid}</h6>
            <h6 className={styles.userName}>定位状态：{this.props.carinfo.locationStatus}</h6>
            <h6 className={styles.userName}>GPS状态：{this.props.carinfo.GPSStatus}</h6>
            <h6 className={styles.userName}>执行器故障：{this.props.carinfo.actuatorFailure}</h6>
            <h6 className={styles.userName}>传感器故障：{this.props.carinfo.sensorFailure}</h6>
            {/* <div>
              <span >车速：{props.carinfo.speed}</span>
              <span >
                <Switch className={styles.switch} defaultChecked={speed_status} onChange={onChange} size="small" />
              </span>
            </div> */}
          </div>
        </li>
      </ul>
    </IceContainer>)
  }
}
