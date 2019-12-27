import React, { useState, useEffect } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Button } from '@alifd/next';
import Carinfo from '../Carinfos';
import styles from './index.module.scss';
import Mymap from './map';
import RouteButton from './routeButton';

import stores from '@/stores/index';
import { useRequest } from '@/utils/request';
import { carData } from '@/config/dataSource';
import { routeName } from '@/config/dataSource';
import { routeInfo } from '@/config/dataSource';

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
  var jsonState = [{ latitude: 39.9784437501, longitude: 116.3522046804 },
  { latitude: 39.9784807462, longitude: 116.3534921408 },
  { latitude: 39.9789986896, longitude: 116.3534545898 },
  { latitude: 39.9790356854, longitude: 116.3521778584 },
  { latitude: 39.9784437501, longitude: 116.3522046804 }];
  //mapstate initial
  var mapState = [116.353015, 39.978694];
  //bindstate to map component
  var initialBindState = [mapState, jsonState];
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
      console.log("getRouteJsonErr", err);
    }
    // fetchJsonData().then(
    //   btnList = Object.assign(bindState, routejson)
    // )
    // setBindState(
    //   btnList
    // )


    // let btnList = Object.assign(bindState, {
    //   "json": [{ latitude: 39.9784437501, longitude: 116.3522046804 },
    //   { latitude: 39.9784807462, longitude: 116.3534921408 },
    //   { latitude: 39.9790356854, longitude: 116.3521778584 },
    //   { latitude: 39.9784437501, longitude: 116.3522046804 }],
    // }
    // )
    // setBindState(
    //   btnList
    // )

    //merge1
    // setBindState({
    //   bindState: Object.assign({}, bindState, {
    //     "json": [
    //       { latitude: 39.9784437501, longitude: 116.3522046804 },
    //       { latitude: 39.9784807462, longitude: 116.3534921408 },
    //       { latitude: 39.9790356854, longitude: 116.3521778584 },
    //       { latitude: 39.9784437501, longitude: 116.3522046804 }
    //     ]
    //   })
    // }
    // );

    //merge2
    // setBindState(
    //   Object.assign({}, bindState, {
    //     "json": [
    //       { latitude: 39.9784437501, longitude: 116.3522046804 },
    //       { latitude: 39.9784807462, longitude: 116.3534921408 },
    //       { latitude: 39.9790356854, longitude: 116.3521778584 },
    //       { latitude: 39.9784437501, longitude: 116.3522046804 }
    //     ]
    //   })
    // );

    //test
    // setCarState({
    //   driveStatus: 1, obstacleAvoid: 1, locationStatus: 1, GPSStatus: 1,
    //   actuatorFailure: 1, sensorFailure: 1
    // });
    // console.log('carState', carState);
  }

  //map info and car info websocket to transport frequently changing data
  //car info
  var initialCarState = {
    driveStatus: 0, obstacleAvoid: 0, locationStatus: 0, GPSStatus: 0,
    actuatorFailure: 0, sensorFailure: 0
  };
  const [carState, setCarState] = useState(initialCarState);

  // var ws = new WebSocket('ws://10.10.51.152:9999');
  // ws.onopen = function () {
  //   // console.log('client: ws connection is open');
  //   //send token 
  //   ws.send(localStorage.getItem("token"));
  // };
  // //only one onmessage . have two parts 1.location 2.carstatus
  // ws.onmessage = function (e) {
  //   console.log('client: received %s', e.data);
  //   let btnList = Object.assign(bindState, {
  //     "map": JSON.parse(e.data.location),
  //   })
  //   setBindState(
  //     btnList
  //   )
  //   // setBindState({
  //   //   map:JSON.parse(e.data.location)
  //   // })
    
  //   setCarState({
  //     carState: JSON.parse(e.data.carinfo)
  //   });
  // };

  function startDrive() {
    console.log("启动智能驾驶");
  }

  return (
    <div>
      <Row gutter="20">
        <Col l="4">
          <IceContainer className={styles.card}>
            {routeState.map((name) =>
              (<div onClick={() => getRouteJson(name[0])}
                key={Math.random()}>
                <RouteButton name={name}></RouteButton>
              </div>)
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
      <Row gutter="10">
        <Col l="3">
          <Button onClick={() => startDrive()}>启动智能驾驶</Button>
        </Col>
        <Col l="3">
          <Button>缓停开关</Button>
        </Col>
        <Col l="3">
          <Button>急停开关</Button>
        </Col>
      </Row>
    </div>
  );
}