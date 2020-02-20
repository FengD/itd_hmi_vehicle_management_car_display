import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import IceContainer from '@icedesign/container';
import { Grid, Button, Message } from '@alifd/next';
import Carinfo from '../Carinfos';
import styles from './index.module.scss';
import MyMap from './map';
import RouteButton from './routeButton';
// import RouteList from './routeList';
import stores from '@/stores/index';
// import { useRequest } from '@/utils/request';
// import { routeName, routeInfo, start, slowStop, emergencyStop } from '@/config/dataSource';
import { serverIp } from '@/config/settings.js';
// import Websocket from 'react-websocket';

const { Row, Col } = Grid;
let ws = null;
console.log("before");
export default function Mapcardata() {
    // console.log("mapcardata");
    // 1.routeNameId
    const routeName = stores.useStore('routeName');
    const { routeNameId, fetchRouteData } = routeName;
    useEffect(() => {
        // console.log("useEffect of get route");
        fetchRouteData(localStorage.getItem('token'), localStorage.getItem('carId'));
    }, []);

    // 2.route json
    // seperate map data each has a state
    const jsonState = [{ latitude: 39.9784437501, longitude: 116.3522046804 },
    { latitude: 39.9784807462, longitude: 116.3534921408 },
    { latitude: 39.9789986896, longitude: 116.3534545898 },
    { latitude: 39.9790356854, longitude: 116.3521778584 },
    { latitude: 39.9784437501, longitude: 116.3522046804 }];
    // const jsonState = [];
    const [routeJsonState, setRouteJsonState] = useState({ "json": jsonState });

    // declare store to fetch route json
    const routeInfo = stores.useStore('routeInfo');
    const { fetchJsonData } = routeInfo;

    // click to select route
    function getRouteJson(routeId) {
        localStorage.setItem("routeId", routeId);
        fetchJsonData(localStorage.getItem("token"), routeId, (routeJson) => {
            setRouteJsonState({
                "json": JSON.parse(routeJson.route_point),
                "center": JSON.parse(routeJson.start_point),
            });
        });
    };

    // 3.route start and end point
    // initial first,later replace
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

    // push into marker
    function DrawMarker(arr) {
        return Array(arr.length).fill(true).map((e, idx) => ({
            position: arr[idx],
            // icon: "./car.png",
            content: idx,
            myIndex: idx,
        }));
    };

    // use two states to describe start/end points
    const [startPointState, setStartPointState] = useState({ "startMarkers": [] });
    const [endPointState, setEndPointState] = useState({ "endMarkers": [], "pointRoute": [] });
    function drwaStartPoints() {
        // const startState = DrawMarker(routePointStart);
        // console.log("startState", DrawMarker(routePointStart));
        setStartPointState({ "startMarkers": DrawMarker(routePointStart) });
    };

    function drawEndPoints() {
        // const endState = DrawMarker(routePointEnd);
        setEndPointState(Object.assign({}, endPointState, {
            "endMarkers": DrawMarker(routePointEnd),
        }));
        // setEndPointState({ "endMarkers": DrawMarker(routePointEnd) });
    };

    // child transfer to father to change selected start/end point
    function receiveStartPoint(arr) {
        // const startState = DrawMarker(arr);
        setStartPointState({ "startMarkers": DrawMarker(arr) });
    };

    function receiveEndPoint(arr, startPoint) {
        const endState = DrawMarker(arr);
        // console.log("selectEndPoint", endState);
        // add start and end point to des polyline
        setEndPointState(Object.assign({}, endPointState, {
            "endMarkers": endState,
            "pointRoute": [startPoint[0].position, endState[0].position],
        }));
        // setEndPointState({ "endMarkers": endState, "pointRoute": [startPoint[0].position, endState[0].position] });
    };


    // 4.car real time location
    // const mapState = { longitude: 116.353015, latitude: 39.978694 };
    // const [locationState, setLocationState] = useState({ "map": mapState });
    // test
    // let settime;
    // settime = setInterval(function () {
    //     // getValue();
    //     // const result = Math.random().toFixed(2);
    //     mapState.latitude *= Math.random();
    //     setLocationState({ "map": mapState });
    //     // console.log("mapState", mapState);
    //     clearInterval(settime);
    //     // result = Math.random().toFixed(2);
    // }, 2000);

    // 5.car status info include car location
    const initialCarState = {
        driveStatus: 0, obstacleAvoid: 0, locationStatus: 0, GPSStatus: 0,
        actuatorFailure: 0, sensorFailure: 0, position: { longitude: 116.353015, latitude: 39.978694 }, speed: 80,
    };
    const [carState, setCarState] = useState(initialCarState);

    // use websocket, later move place
    // const ws = new WebSocket(`ws://${serverIp}/ws/car?token=${localStorage.getItem("token")}`);
    // useEffect(() => {
    //     console.log("useEffect of connect");
    //     ws = new WebSocket(`ws://${serverIp}/ws/car?token=${localStorage.getItem("token")}`);
    // }, []);
    if (ws == null) {
        console.log("11111111");
        ws = new WebSocket(`ws://${serverIp}/ws/car?token=${localStorage.getItem("token")}`);
    }
    // ws = new WebSocket(`ws://${serverIp}/ws/car?token=${localStorage.getItem("token")}`);
    ws.onopen = function () {
        // ws.send(localStorage.getItem("token"));
        console.log("success");
    };

    // only one onmessage()  have two parts 1.location 2.carstatus
    ws.onmessage = function (e) {
        // console.log("wb msg", e);
        const message = JSON.parse(e.data);
        // eslint-disable-next-line eqeqeq
        if (message.type == "current_status") {
            // console.log("current_status");
            // console.log("message.content", message.content);
            setCarState({
                driveStatus: message.content.adv_status,
                obstacleAvoid: message.content.ev_aim,
                locationStatus: message.content.loc_flag,
                GPSStatus: message.content.gps_flag,
                actuatorFailure: message.content.actuator_error,
                sensorFailure: message.content.sensor_error,
                position: {
                    longitude: message.content.longitude,
                    latitude: message.content.latitude,
                },
                speed: message.content.speed,
            });
        }
    };

    // 6.drive action
    const initialStartState = false;
    const [startState, setStartState] = useState(initialStartState);
    const driveAction = stores.useStore('driveAction');
    const { handleDriveAction } = driveAction;

    function carAction(action) {
        if (localStorage.getItem("routeId") == null) {
            Message.error('请先选择路线');
        }
        else {
            switch (action) {
                case 0:
                    handleDriveAction(localStorage.getItem('token'),
                        localStorage.getItem('carName'),
                        localStorage.getItem('routeId'),
                        "AdvStart", (msg) => {
                            console.log("msg", msg);
                            if (msg === "OK") {
                                setStartState(true);
                                Message.success('开始智能驾驶');
                            }
                            else {
                                Message.error('启动失败');
                            }
                        });
                    break;
                case 1:
                    handleDriveAction(localStorage.getItem('token'),
                        localStorage.getItem('carName'),
                        localStorage.getItem('routeId'),
                        "AdvStart", (msg) => {
                            console.log("msg", msg);
                            if (msg === "OK") {
                                setStartState(true);
                                Message.success('开始缓停');
                            }
                            else {
                                Message.error('缓停失败');
                            }
                        });
                    break;
                case 2:
                    handleDriveAction(localStorage.getItem('token'),
                        localStorage.getItem('carName'),
                        localStorage.getItem('routeId'),
                        "AdvStart", (msg) => {
                            console.log("msg", msg);
                            if (msg === "OK") {
                                setStartState(true);
                                Message.success('开始急停');
                            }
                            else {
                                Message.error('急停失败');
                            }
                        });
                    break;
                default:
                    break;
            };
        }
    };

    return (
        <div role="grid">
            {/* <Websocket url={`ws://${serverIp}/ws/car?token=${localStorage.getItem("token")}`}
                  onMessage={handleData}/> */}
            <Row gutter="20" wrap="true">
                <Col l="4" s="6" hidden={['xs', 'xxs']}>
                    <div role="grid">
                        <Row >
                            <IceContainer className={styles.RouteContainer}>
                                <h3 className={styles.title}>可选择路线</h3>
                                {routeNameId.map((route) =>
                                    (<div className={styles.leftRouteBtn} onClick={() => getRouteJson(route.route_id)}
                                        key={route.route_id}>
                                        <RouteButton className={styles.RouteList} name={route.name} />
                                    </div>)
                                )}
                                {/* <RouteList routeList={routeNameId} /> */}
                            </IceContainer>
                        </Row>

                        {/* <Row>
                            <IceContainer className={styles.RouteContainer}>
                                <h3 className={styles.title}>起始点选择</h3>
                                <div className={styles.leftRouteBtn}>
                                    <Button onClick={() => drwaStartPoints()} className={`${styles.leftBtnItem} ${styles.leftBtn}`}
                                        style={{ width: 150 }}>选择起点</Button>
                                </div>
                                <div className={styles.leftRouteBtn}>
                                    <Button onClick={() => drawEndPoints()} className={`${styles.leftBtnItem} ${styles.leftBtn}`}
                                        style={{ width: 150 }}>选择终点</Button>
                                </div>
                            </IceContainer>
                        </Row> */}

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
                                {/* <MyMap location={mapState} /> */}
                                <MyMap
                                    routeJson={routeJsonState}
                                    carLocation={carState.position}
                                    startPoint={startPointState}
                                    endPoint={endPointState}
                                    selectStartPoint={(arr) => { receiveStartPoint(arr); }}
                                    selectEndPoint={(arr, startPoint) => { receiveEndPoint(arr, startPoint); }}
                                />
                            </IceContainer>
                        </Row>
                        {/* 底部按钮响应式显示 */}
                        <Row wrap="true" className={styles.BottomBtnContainer}>
                            <img src="start.png" alt="" />
                            <Button onClick={() => carAction(0)} disabled={startState} className={styles.BottomBtn1}><span className="glyphicon glyphicon-off" />启动智能驾驶</Button>

                            <Button onClick={() => carAction(1)} disabled={!startState} className={styles.BottomBtn2}><span className="glyphicon glyphicon-refresh" />缓停开关</Button>

                            <Button onClick={() => carAction(2)} disabled={!startState} className={styles.BottomBtn3}><span className="glyphicon glyphicon-exclamation-sign" />急停开关</Button>
                        </Row>
                    </div>
                </Col>
                <Col l="4" hidden={['m', 's', 'xs', 'xxs']}>
                    <Carinfo carinfo={carState} />
                </Col>
            </Row>
            {/* <div className={styles.BottomBtnContainer}>
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
            </div> */}
        </div >
    );
}