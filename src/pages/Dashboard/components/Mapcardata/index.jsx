import React from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@alifd/next';
import Users from '../Carinfos';
import styles from './index.module.scss';
import Mymap from './map';

const { Row, Col } = Grid;

export default function Mapcardata() {
  return (
    <Row gutter="20">
      <Col l="18">
        <IceContainer className={styles.card}>
          <Mymap />
        </IceContainer>
      </Col>
      <Col l="6">
        <Users />
      </Col>
    </Row>
  );
}
