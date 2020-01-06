import React, { useState, useEffect } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Button, Message } from '@alifd/next';
import Carinfo from '../Carinfos';
import styles from './index.module.scss';
import Mymap from './map';
import RouteButton from './routeButton';

import stores from '@/stores/index';
import { useRequest } from '@/utils/request';
import { carProfile, routeName, routeInfo, start, slowStop, emergencyStop } from '@/config/dataSource';
import { serverIP } from '@/config/settings.js';

const { Row, Col } = Grid;

export default function Mapcardata() {
  //route info 
  // var initialRouteState = [["1", "综合楼--设计中心"], ["2", "综合楼--广场"], ["3", "综合楼--食堂"]];
  var initialRouteState = [{ "route_id": 1, "route_name": "1111" }, { "route_id": 2, "route_name": "2222" }, { "route_id": 3, "route_name": "3333" },]

  const [routeState, setRouteState] = useState(initialRouteState);
  const routeName = stores.useStore('routeName');
  const { routeNameID, fetchRouteData } = routeName;
  // useEffect(() => {
  //   console.log("useEffect");
  //   fetchRouteData().then(setRouteState({
  //     routeState: routeNameID
  //   }));
  // }, []);

  //route json initial
  var jsonState = [{ latitude: 39.9784437501, longitude: 116.3522046804 },
  { latitude: 39.9784807462, longitude: 116.3534921408 },
  { latitude: 39.9789986896, longitude: 116.3534545898 },
  { latitude: 39.9790356854, longitude: 116.3521778584 },
  { latitude: 39.9784437501, longitude: 116.3522046804 }];

  //mapstate initial
  // var mapState = [116.353015, 39.978694];
  var mapState = { longitude: 116.353015, latitude: 39.978694 };

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
    try {
      localStorage.setItem("routeid", routeid);
      console.log("getCityJson", routeid);
      await fetchJsonData();
      let btnList = Object.assign(bindState, {
        "json": routejson["route_json"],
      });
      setBindState(
        btnList
      );
    } catch (err) {
      // Message.error("路线json获取失败");
      console.log("getRouteJsonErr", err);
    }

  }

  //map info and car info websocket to transport frequently changing data
  //car info
  var initialCarState = {
    driveStatus: 0, obstacleAvoid: 0, locationStatus: 0, GPSStatus: 0,
    actuatorFailure: 0, sensorFailure: 0
  };
  const [carState, setCarState] = useState(initialCarState);

  var ws = new WebSocket('ws://' + serverIP + '/car/ws?token=' + localStorage.getItem("token"));
  ws.onopen = function () {
    ws.send(localStorage.getItem("token"));
  };

  //only one onmessage . have two parts 1.location 2.carstatus
  ws.onmessage = function (e) {
    console.log('client: received %s', e.data);
    
    if (e.data["type"] == "current_position") {
      console.log("current_position", e.data["content"]);
      let btnList = Object.assign(bindState, {
        "map": JSON.parse(e.data["content"]),
      })
      setBindState(
        btnList
      )
    }

    if (e.data["type"] == "current_status") {
      console.log("current_status", e.data["content"]);
      setCarState({
        carState: JSON.parse(e.data["content"])
      });
    }
  };

  //drive action
  var initialStartState = false;
  const [startState, setStartState] = useState(initialStartState);

  const { driveRequest } = useRequest(start);
  const { slowRequest } = useRequest(slowStop);
  const { emegencyRequest } = useRequest(emergencyStop);

  async function start() {
    try {
      await driveRequest();
      setStartState(true);
      Message.success('开始智能驾驶');
    } catch (err) {
      Message.error('启动失败');
      console.log("driveRequestErr", err);
    }
  }

  async function slowStop() {
    try {
      await slowRequest();
      setStartState(false);
      Message.success('开始缓停');
    } catch (err) {
      Message.error('缓停失败');
      console.log("slowRequestErr", err);
    }
  }

  async function emergencyStop() {
    try {
      await emegencyRequest();
      setStartState(false);
      Message.success('开始急停');
    } catch (err) {
      Message.error('急停失败');
      console.log("emegencyRequestErr", err);
    }
  }

  return (
    <div>
      <Row gutter="20">
        <Col l="4">
          <IceContainer className={styles.card}>
            {routeState.map((route) =>
              (<div onClick={() => getRouteJson(route["route_id"])}
                key={Math.random()}>
                <RouteButton name={route["route_name"]}></RouteButton>
              </div>)
            )}
          </IceContainer>
        </Col>
        <Col l="14">
          <IceContainer className={styles.card}>
            {/* <Mymap location={mapState} /> */}
            <Mymap mapdata={bindState} />
          </IceContainer>
        </Col>
        <Col l="6">
          <Carinfo carinfo={carState}></Carinfo>
        </Col>
      </Row>
      <Row gutter="10">
        <Col l="3">
          <Button onClick={() => start()} disabled={startState}>启动智能驾驶</Button>
        </Col>
        <Col l="3">
          <Button onClick={() => slowStop()} disabled={!startState}>缓停开关</Button>
        </Col>
        <Col l="3">
          <Button onClick={() => emergencyStop()} disabled={!startState}>急停开关</Button>
        </Col>
      </Row>
    </div>
  );
}