import React, { useState, useEffect } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Button, Message } from '@alifd/next';
import Carinfo from '../Carinfos';
import styles from './index.module.scss';
import Mymap from './map';
import RouteButton from './routeButton';

import stores from '@/stores/index';
import { useRequest } from '@/utils/request';
import { carData, routeName, routeInfo, start, slowStop, emergencyStop } from '@/config/dataSource';
import { serverIP } from '@/config/settings.js';

const { Row, Col } = Grid;

export default function Mapcardata() {
  //route info 
  // var initialRouteState = { "1": "综合楼--设计中心", "2": "综合楼--广场", "3": "综合楼--食堂" };
  // var initialRouteState = [{ "1": "综合楼--设计中心" }, { "2": "综合楼--广场" }, { "3": "综合楼--食堂" }];
  // var initialRouteState = ["综合楼--设计中心", "综合楼--广场", "综合楼--食堂"];
  var initialRouteState = [["1", "综合楼--设计中心"], ["2", "综合楼--广场"], ["3", "综合楼--食堂"]];

  const [routeState, setRouteState] = useState(initialRouteState);
  
  

  const routeName = stores.useStore('routeName');
  const { routeinfo, fetchRouteData } = routeName;
  // useEffect(() => {
  //   fetchRouteData().then(setRouteState({
  //     routeState: routeinfo
  //   }))
  // }, []);

  //route json initial
  var jsonState = [
    { latitude: 39.9784437501, longitude: 116.3522046804 },
    { latitude: 39.9784807462, longitude: 116.3534921408 },
    { latitude: 39.9789986896, longitude: 116.3534545898 },
    { latitude: 39.9790356854, longitude: 116.3521778584 },
    { latitude: 39.9784437501, longitude: 116.3522046804 }
  ];

  //mapstate initial
  var mapState = [116.353015, 39.978694];

  //bindstate to map component
  // var initialBindState = [mapState, jsonState];
  var initialBindState = {
    "map": mapState,
    "json": jsonState,
  }
  const [bindState, setBindState] = useState(initialBindState);

  //route json get
  const routeInfo = stores.useStore('routeInfo');
  const { routejson, fetchJsonData } = routeInfo;

  async function getRouteJson(routeid) {
    localStorage.setItem("routeid", routeid);
    console.log("getCityJson", routeid);
    try {
      await fetchJsonData();
      let btnList = Object.assign(bindState, {
        "json": routejson,
      })
      setBindState(
        btnList
      )
    } catch (err) {
      Message.error("路线json获取失败");
      console.log("getRouteJsonErr", err);
    }
    // fetchJsonData().then(
    //   btnList = Object.assign(bindState, routejson)
    // )
    // setBindState(
    //   btnList
    // )
  }

  //map info and car info websocket to transport frequently changing data
  //car info
  var initialCarState = {
    driveStatus: 0, obstacleAvoid: 0, locationStatus: 0, GPSStatus: 0,
    actuatorFailure: 0, sensorFailure: 0
  };
  const [carState, setCarState] = useState(initialCarState);

  // var ws = new WebSocket('ws://serverIP/test?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIiwiZXhwIjoxNTc3NzQyMjgwLCJpYXQiOjE1Nzc2OTkwODB9._BG6w-TmJMD0A6UywK9FgDdyIXdGnYT8aQCnlZniYkI');
  var ws = new WebSocket('ws://' + serverIP + '/car/ws?token=' + localStorage.getItem("token"));
  ws.onopen = function () {
    ws.send(localStorage.getItem("token"));
  };

  //only one onmessage . have two parts 1.location 2.carstatus
  ws.onmessage = function (e) {
    console.log('client: received %s', e.data);
    let btnList = Object.assign(bindState, {
      "map": JSON.parse(e.data.location),
    })
    setBindState(
      btnList
    )
    // setBindState({
    //   map:JSON.parse(e.data.location)
    // })

    setCarState({
      carState: JSON.parse(e.data.carinfo)
    });
  };

  //drive action
  const { driveRequest } = useRequest(start);
  const { slowRequest } = useRequest(slowStop);
  const { emegencyRequest } = useRequest(emergencyStop);

  async function start() {
    try {
      await driveRequest();
      Message.success('开始智能驾驶');
    } catch (err) {
      Message.error('启动失败');
      console.error("driveRequestErr", err);
    }
  }

  async function slowStop() {
    try {
      await slowRequest();
      Message.success('开始缓停');
    } catch (err) {
      Message.error('缓停失败');
      console.error("slowRequestErr", err);
    }
  }

  async function emergencyStop() {
    try {
      await emegencyRequest();
      Message.success('开始急停');
    } catch (err) {
      Message.error('急停失败');
      console.error("emegencyRequestErr", err);
    }
  }

  return (
    <div>
      <Row gutter="20">
        <Col l="4">
          <IceContainer className={styles.RouteContainer}>
            {routeState.map( (name) =>
              (
                <RouteButton name={name} onClick={() => getRouteJson(name[0])}
                key={Math.random()} className={styles.RouteList}></RouteButton>
              )
            )}
          </IceContainer>
        </Col>
        <Col l="14">
          <IceContainer className={styles.card}>
            {/* <Mymap location={mapState} /> */}
            <Mymap location={bindState} />
          </IceContainer>
        </Col>
        <Col l="6">
          <Carinfo carinfo={carState}></Carinfo>
        </Col>
      </Row>
      <div className={styles.BottomBtnContainer}>
          <img src="start.png" alt=""/>
          <Button onClick={() => start()} className={styles.BottomBtn}>启动智能驾驶</Button>
        
          <Button onClick={() => slowStop()} className={styles.BottomBtn}>缓停开关</Button>
        
          <Button onClick={() => emergencyStop()} className={styles.BottomBtn}>急停开关</Button>
      </div>  
    </div>
  );
}