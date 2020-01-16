import React, { useState, useEffect } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Button, Message } from '@alifd/next';
import Carinfo from '../Carinfos';
import styles from './index.module.scss';
import Mymap from './map';
import RouteButton from './routeButton';
import stores from '@/stores/index';
import { useRequest } from '@/utils/request';
// import { routeName, routeInfo, start, slowStop, emergencyStop } from '@/config/dataSource';
import { serverIp } from '@/config/settings.js';

const { Row, Col } = Grid;

export default function Mapcardata() {
  // route info 
  // var initialRouteState = { "1": "综合楼--设计中心", "2": "综合楼--广场", "3": "综合楼--食堂" };
  // var initialRouteState = [{ "1": "综合楼--设计中心" }, { "2": "综合楼--广场" }, { "3": "综合楼--食堂" }];
  // var initialRouteState = ["综合楼--设计中心", "综合楼--广场", "综合楼--食堂"];
  // const routeNameId = [["1", "综合楼--设计中心"], ["2", "综合楼--广场"], ["3", "综合楼--食堂"]];

  // const [routeState, setRouteState] = useState(initialRouteState);

  const routeName = stores.useStore('routeName');
  const { routeNameId, fetchRouteData } = routeName;
  useEffect(() => {
    fetchRouteData(localStorage.getItem('token'), localStorage.getItem('carId'));
  }, [fetchRouteData]);

  // route json initial
  const jsonState = [{ latitude: 39.9784437501, longitude: 116.3522046804 },
  { latitude: 39.9784807462, longitude: 116.3534921408 },
  { latitude: 39.9789986896, longitude: 116.3534545898 },
  { latitude: 39.9790356854, longitude: 116.3521778584 },
  { latitude: 39.9784437501, longitude: 116.3522046804 }];

  // mapstate initial
  const mapState = { longitude: 116.353015, latitude: 39.978694 };

  // bindstate to map component
  const initialBindState = {
    "map": mapState,
    "json": jsonState,
    "center": mapState,
    "startMarkers": [],
    "endMarkers": [],
    "pointRoute": [],
  };
  const [bindState, setBindState] = useState(initialBindState);

  // route json get
  const routeInfo = stores.useStore('routeInfo');
  const { fetchJsonData } = routeInfo;

  function getRouteJson(routeId) {
    localStorage.setItem("routeId", routeId);
    fetchJsonData(localStorage.getItem("token"), routeId, (routeJson) => {
      console.log("bindStateRouteJson", routeJson);
      setBindState(Object.assign({}, bindState,
        {
          "json": JSON.parse(routeJson.route_point),
          "center": JSON.parse(routeJson.start_point),
        }));
    });
  }

  // map info and car info websocket to transport frequently changing data
  // car info
  const initialCarState = {
    driveStatus: 0, obstacleAvoid: 0, locationStatus: 0, GPSStatus: 0,
    actuatorFailure: 0, sensorFailure: 0,
  };
  const [carState, setCarState] = useState(initialCarState);

  const ws = new WebSocket(`ws://${serverIp}/ws/car?token=${localStorage.getItem("token")}`);
  ws.onopen = function () {
    ws.send(localStorage.getItem("token"));
  };

  // only one onmessage . have two parts 1.location 2.carstatus
  ws.onmessage = function (e) {
    const message = JSON.parse(e.data);
    // eslint-disable-next-line eqeqeq
    if (message.type == "current_position") {
      console.log("startPosition");
      setBindState(Object.assign({}, bindState, { "map": message.content }));
    }
    // eslint-disable-next-line eqeqeq
    if (message.type == "current_status") {
      console.log("startStatus");
      setCarState(message.content);
    }
  };

  // route start and end point
  const routePointStart = [{ longitude: 105.99888770033331, latitude: 47.06777371167721 },
  { longitude: 114.88681592235889, latitude: 46.94606002486967 },
  { longitude: 110.66380007290148, latitude: 46.71616678476706 },
  { longitude: 104.71319289749614, latitude: 31.151163346364235 },
  { longitude: 105.64896936202821, latitude: 48.629345079177 },
  { longitude: 105.7304857614459, latitude: 31.805981846428097 }];

  const routePointEnd = [{ longitude: 114.54938904602815, latitude: 31.199534407620433 },
  { longitude: 103.0814661277989, latitude: 30.338406977208905 },
  { longitude: 111.90561468953058, latitude: 36.135410840814856 },
  { longitude: 107.53662279416756, latitude: 47.082748304534654 },
  { longitude: 110.97002080388673, latitude: 33.99917459066189 },
  { longitude: 118.5889323304047, latitude: 35.19632485009283 }];

  // create marker from given data(arry)
  // const DrawMarker = (arr) => (
  //   Array(arr.length).fill(true).map((e, idx) => ({
  //     position: arr[idx],
  //     myIndex: idx,
  //   }))
  // );

  function DrawMarker(arr) {
    return Array(arr.length).fill(true).map((e, idx) => ({
      position: arr[idx],
      icon: "./car.png",
      content: idx,
      myIndex: idx,
    }));
  };

  // use two states to describe start/end points
  function drwaStartPoints() {
    // const startState = DrawMarker(routePointStart);
    console.log("startState", DrawMarker(routePointStart));
    setBindState(Object.assign({}, bindState, { "startMarkers": DrawMarker(routePointStart) }));
  };

  function drawEndPoints() {
    // const endState = DrawMarker(routePointEnd);
    setBindState(Object.assign({}, bindState, { "endMarkers": DrawMarker(routePointEnd) }));
  };

  // child transfer to father to change selected start/end point
  function receiveStartPoint(arr) {
    // const startState = DrawMarker(arr);
    setBindState(Object.assign({}, bindState, { "startMarkers": DrawMarker(arr) }));
  }

  function receiveEndPoint(arr, startPoint) {
    const endState = DrawMarker(arr);
    console.log("selectEndPoint", endState);
    setBindState(Object.assign({}, bindState, { "endMarkers": endState, "pointRoute": [startPoint[0].position, endState[0].position] }));
  }

  // drive action
  const initialStartState = false;
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
    <div role="grid">
      <Row gutter="20" wrap="true">
        <Col l="4" s="6" hidden={['xs', 'xxs']}>
          <div role="grid">
            <Row >
              <IceContainer className={styles.RouteContainer}>
                <h3 className={styles.title}>可选择路线</h3>
                {routeNameId.map((route) =>
                  (<div className={styles.fBtn} onClick={() => getRouteJson(route.route_id)}
                    key={Math.random()}>
                    <RouteButton className={styles.RouteList} name={route.name} />
                  </div>)
                )}
              </IceContainer>
            </Row>

            <Row>
              <IceContainer className={styles.RouteContainer}>
                <h3 className={styles.title}>起始点选择</h3>
                <br />
                <Button onClick={() => drwaStartPoints()} className={styles.leftBtnItem}
                  style={{ width: 150 }}>选择起点</Button>
                <br />
                <Button onClick={() => drawEndPoints()} className={styles.leftBtnItem}
                  style={{ width: 150 }}>选择终点</Button>
              </IceContainer>
            </Row>

            {/* 右侧车辆情况内容 */}
            <Row hidden={['xl', 'l', 'xs', 'xxs']}>
              <Carinfo carinfo={carState} className={styles.leftList} />
            </Row>
          </div>
        </Col>
        <Col l="16" s="18">
          <div role="grid">
            <Row>
              <IceContainer className={styles.card}>
                {/* <Mymap location={mapState} /> */}
                <Mymap mapdata={bindState} selectStartPoint={(arr) => { receiveStartPoint(arr); }}
                  selectEndPoint={(arr, startPoint) => { receiveEndPoint(arr, startPoint); }} />
              </IceContainer>
            </Row>
            {/* 底部按钮响应式显示 */}
            <Row hidden={['l', 'xl']} wrap="true">
              <img src="start.png" alt="" />
              <Button onClick={() => start()} disabled={startState} className={styles.BottomBtn1}><span className="glyphicon glyphicon-off" />启动智能驾驶</Button>

              <Button onClick={() => slowStop()} disabled={startState} className={styles.BottomBtn2}><span className="glyphicon glyphicon-refresh" />缓停开关</Button>

              <Button onClick={() => emergencyStop()} disabled={startState} className={styles.BottomBtn3}><span className="glyphicon glyphicon-exclamation-sign" />急停开关</Button>
            </Row>
          </div>
        </Col>
        <Col l="4" hidden={['m', 's', 'xs', 'xxs']}>
          <Carinfo carinfo={carState} />
        </Col>
      </Row>
      <div className={styles.BottomBtnContainer}>
        <div role="grid">
          <Row gutter="20" wrap="true" hidden={['m', 's', 'xs', 'xxs']}>
            <Col span='4' />
            <Col span='16' className={styles.btnSecContainer} >
              <img src="start.png" alt="" />
              <Button onClick={() => start()} disabled={startState} className={styles.BottomBtn1}><span className="glyphicon glyphicon-off " />启动智能驾驶</Button>

              <Button onClick={() => slowStop()} disabled={startState} className={styles.BottomBtn2}><span className="glyphicon glyphicon-refresh " />缓停开关</Button>

              <Button onClick={() => emergencyStop()} disabled={startState} className={styles.BottomBtn3}><span className="glyphicon glyphicon-exclamation-sign " />急停开关</Button>
            </Col>
            <Col span='4' />
          </Row>
        </div>
      </div>
    </div >
  );
}