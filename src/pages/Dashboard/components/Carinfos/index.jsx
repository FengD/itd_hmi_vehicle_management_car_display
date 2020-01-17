import React from 'react';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function Carinfo(props) {
  return (
  <IceContainer className={styles.container}>
    <h3 className={styles.title}>车辆情况</h3>
    {/* <ul>
      <li className={styles.userItem} >
        <div className={styles.userInfo}>
          <br />
          <h6 className={styles.userName}>智驾状态：{props.carinfo.driveStatus}</h6>
          <br />
          <h6 className={styles.userName}>避障触发：{props.carinfo.obstacleAvoid}</h6>
          <br />
          <h6 className={styles.userName}>定位状态：{props.carinfo.locationStatus}</h6>
          <br />
          <h6 className={styles.userName}>GPS状态：{props.carinfo.GPSStatus}</h6>
          <br />
          <h6 className={styles.userName}>执行器故障：{props.carinfo.actuatorFailure}</h6>
          <br />
          <h6 className={styles.userName}>传感器故障：{props.carinfo.sensorFailure}</h6>
          
        </div>
      </li>
    </ul> */}
    <table className="table table-hover ">
    <tbody>
      <tr className="active">
        <td><span>智驾状态：</span>{props.carinfo.driveStatus}</td>
      </tr>
      <tr className="">
        <td><span>避障触发：</span>{props.carinfo.obstacleAvoid}</td>
      </tr>
      <tr className="active">
        <td><span>定位状态：</span>{props.carinfo.locationStatus}</td>
      </tr>
      <tr className="">
        <td><span>GPS状态：</span>{props.carinfo.GPSStatus}</td>
      </tr>
      <tr className="active">
        <td><span>执行器故障：</span>{props.carinfo.actuatorFailure}</td>
      </tr>
      <tr className="">
        <td><span>传感器故障：</span>{props.carinfo.sensorFailure}</td>
      </tr>
  </tbody>
    </table>
  </IceContainer>);
}
