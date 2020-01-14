import React, { useEffect } from 'react';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

import stores from '@/stores';
import { useRequest } from '@/utils/request';
import { carData } from '@/config/dataSource';

import PubSub from 'pubsub-js';
import { Switch } from '@alifd/next';

import ReactDom from 'react'

export default class Carinfo extends React.Component {
  // console.log("props", props.carinfo);
  // console.log("props.carinfo.name", props.carinfo.name);
  // const carData = stores.useStore('carData');
  // const { carinfo, fetchData } = carData;
  // const { carid, name, department, longitude, latitude, speed } = carinfo;
  // var speed_status = false;
  // console.log('carData', carinfo);
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // function onChange(checked) {
  //   console.log("checked", checked);
  //   PubSub.publish('speed_status', checked);
  // }

  render(){
    console.log("this.props.carinfo",this.props.carinfo);

    return (<IceContainer className={styles.container}>
      <h3 className={styles.title}>车辆情况</h3>
      <ul>
        <li className={styles.userItem} >
          <div className={styles.userInfo}>
            <br></br>
            <h6 className={styles.userName}>智驾状态：{this.props.carinfo.driveStatus}</h6>
            <br></br>
            <h6 className={styles.userName}>避障触发：{this.props.carinfo.obstacleAvoid}</h6>
            <br></br>
            <h6 className={styles.userName}>定位状态：{this.props.carinfo.locationStatus}</h6>
            <br></br>
            <h6 className={styles.userName}>GPS状态：{this.props.carinfo.GPSStatus}</h6>
            <br></br>
            <h6 className={styles.userName}>执行器故障：{this.props.carinfo.actuatorFailure}</h6>
            <br></br>
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
