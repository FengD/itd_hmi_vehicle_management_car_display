import React, { useEffect, useState, useRef } from 'react';
import IceContainer from '@icedesign/container';
import { Progress, Grid } from '@alifd/next';
import PubSub from 'pubsub-js';
import styles from './index.module.scss';
import Columnanimated from './Columnanimated';
import Gauge from './tabletest';
import Basicanimated from './Basic';
import Test from './Test';

const { Row, Col } = Grid;
export default function Datacharts() {
  const [resultState, setResultState] = useState();
  let settime;
  settime=setInterval(function () {
    // getValue();
    // const result = Math.random().toFixed(2);
    setResultState(Math.random().toFixed(2));
    clearInterval(settime);
    // console.log("result", resultState);
    // result = Math.random().toFixed(2);
  }, 1000);
  // clearInterval(settime);
  console.log("hhhh");
  const result2 = 111;

  return (
    <Row wrap gutter="20">
      <Col xxs="12" s="12" l="8">
        <IceContainer >
          <Test data={resultState} datab={result2} />
        </IceContainer>
      </Col>
    </Row>
  );
}
