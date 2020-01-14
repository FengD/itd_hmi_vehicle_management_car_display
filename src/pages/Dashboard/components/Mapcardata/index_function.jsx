import React, { useState, useEffect } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Button, Message,Drawer} from '@alifd/next';
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
  //route info 
  // var initialRouteState = { "1": "综合楼--设计中心", "2": "综合楼--广场", "3": "综合楼--食堂" };
  // var initialRouteState = [{ "1": "综合楼--设计中心" }, { "2": "综合楼--广场" }, { "3": "综合楼--食堂" }];
  // var initialRouteState = ["综合楼--设计中心", "综合楼--广场", "综合楼--食堂"];
  var initialRouteState = [["1", "综合楼--设计中心"], ["2", "综合楼--广场"], ["3", "综合楼--食堂"]];

  const [routeState, setRouteState] = useState(initialRouteState);

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
            <Row>
                <IceContainer className={styles.RouteContainer , styles.leftList}>
                <h3 className={styles.title}>车辆路线</h3>
                  {routeState.map( (name) =>
                    (
                      <RouteButton name={route.name} onClick={() => getRouteJson(route.route_id)}
                      key={Math.random()} className={styles.RouteList}></RouteButton>
                    )
                  )}
                </IceContainer>
           </Row>
           {/* 右侧车辆情况内容 */}
            <Row hidden={['xl','l','xs', 'xxs']}>
              <Carinfo  carinfo={carState} className={styles.leftList}></Carinfo>
            </Row>
          </div>
        </Col>
        <Col l="16" s="18">
        <div role="grid">
          <Row>
            <IceContainer className={styles.card}>
              {/* <Mymap location={mapState} /> */}
              <Mymap location={bindState} />
            </IceContainer>
          </Row>
          {/* 底部按钮响应式显示 */}
          <Row hidden={['l','xl']} wrap="true">
            <img src="start.png" alt=""/>
            <Button onClick={() => start()} className={styles.BottomBtn1}><span className="glyphicon glyphicon-off"></span>启动智能驾驶</Button>
          
            <Button onClick={() => slowStop()} className={styles.BottomBtn2}><span className="glyphicon glyphicon-refresh"></span>缓停开关</Button>
          
            <Button onClick={() => emergencyStop()} className={styles.BottomBtn3}><span className="glyphicon glyphicon-exclamation-sign"></span>急停开关</Button>
          </Row>
          </div>
        </Col>
        <Col l="4"  hidden={['m','s','xs', 'xxs']}>
          <Carinfo carinfo={carState}></Carinfo>
        </Col>
      </Row>
      <div className={styles.BottomBtnContainer}>
        <div role="grid">
        <Row gutter="20" wrap="true" hidden={['m','s','xs','xxs']}>
          <Col span='4'></Col>
          <Col span='16' className={styles.btnSecContainer} >
            <img src="start.png" alt=""/>
            <Button onClick={() => start()} className={styles.BottomBtn1}><span className="glyphicon glyphicon-off "></span>启动智能驾驶</Button>
          
          <Button onClick={() => slowStop()} className={styles.BottomBtn2}><span className="glyphicon glyphicon-refresh "></span>缓停开关</Button>
        
          <Button onClick={() => emergencyStop()} className={styles.BottomBtn3}><span className="glyphicon glyphicon-exclamation-sign "></span>急停开关</Button>
          </Col>
          <Col span='4'></Col>
        </Row>
        </div>
      </div>  
    </div>
  );
}