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
import { serverIp } from '@/config/settings.js';
import { random } from 'gl-matrix/src/gl-matrix/vec2';

const { Row, Col } = Grid;

export default function Mapcardata() {
  //route id name 
  const routeName = stores.useStore('routeName');
  const { routeNameId, fetchRouteData } = routeName;
  useEffect(() => {
    // console.log("useeffect");
    fetchRouteData(localStorage.getItem('carId'), localStorage.getItem('token'));
    // setInterval(() => {
    //   var lat = 35 + Math.random() * 10;
    //   var long = 120 + Math.random() * 10;
    //   let tempList = Object.assign(bindState, {
    //     "map": { longitude: long, latitude: lat },
    //     "center": { longitude: long, latitude: lat },
    //   })
    //   setBindState(tempList);
    //   // handleWsmessage(lat, long);
    //   console.log("bindState", bindState);
    // }, 10000);
    // return () => clearInterval(id);
  }, []);

  async function handleWsmessage(lat, long) {
    if (lat != bindState["map"]["latitude"] && long != bindState["map"]["longitude"]) {
      let tempList = Object.assign(bindState, {
        "map": { longitude: long, latitude: lat },
      })
      await setBindState(tempList);
    }
  }

  //route json initial
  var jsonState = [{ latitude: 39.9784437501, longitude: 116.3522046804 },
  { latitude: 39.9784807462, longitude: 116.3534921408 },
  { latitude: 39.9789986896, longitude: 116.3534545898 },
  { latitude: 39.9790356854, longitude: 116.3521778584 },
  { latitude: 39.9784437501, longitude: 116.3522046804 }];

  //mapstate initial
  var mapState = { longitude: 116.353015, latitude: 39.978694 };

  //bindstate to map component
  var initialBindState = {
    "map": mapState,
    "json": jsonState,
    "center": mapState,
  }
  const [bindState, setBindState] = useState(initialBindState);

  //route json get
  const routeInfo = stores.useStore('routeInfo');
  const { routeJson, fetchJsonData } = routeInfo;

  function getRouteJson(routeId) {
    localStorage.setItem("routeId", routeId);
    fetchJsonData(routeId, (routeJson) => {
      console.log("bindStateRouteJson", routeJson);
      let btnList = Object.assign(bindState, {
        "json": JSON.parse(routeJson["route_point"]),
        "center": JSON.parse(routeJson["start_point"]),
      });
      setBindState(btnList);
    });
  }

  //map info and car info websocket to transport frequently changing data
  //car info
  var initialCarState = {
    driveStatus: 0, obstacleAvoid: 0, locationStatus: 0, GPSStatus: 0,
    actuatorFailure: 0, sensorFailure: 0
  };
  const [carState, setCarState] = useState(initialCarState);

  var ws = new WebSocket('ws://' + serverIp + '/ws/car?token=' + localStorage.getItem("token"));
  ws.onopen = function () {
    ws.send(localStorage.getItem("token"));
  };

  //only one onmessage . have two parts 1.location 2.carstatus
  ws.onmessage = function (e) {
    const message = JSON.parse(e.data);
    if (message["type"] == "current_position") {
      console.log("start");
      let tempList = Object.assign(bindState, {
        "map": { longitude: 117.353015, latitude: 38.978694 },
      })
      setBindState(tempList);
    }
    else if (message["type"] == "current_status") {
      setCarState({
        carState: message["content"]
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
            {routeNameId.map((route) =>
              (<div onClick={() => getRouteJson(route["route_id"])}
                key={Math.random()}>
                <RouteButton name={route["name"]}></RouteButton>
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
    </div >
  );
}