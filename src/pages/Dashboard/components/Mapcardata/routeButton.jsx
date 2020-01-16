import { Button } from '@alifd/next';
import React from 'react';
import styles from './index.module.scss';

export default function RouteButton(props) {
    const styleBtn = {
        width: 150,
    };
    return (<div className={styles.leftBtn}>
        <Button type="secondary" style={styleBtn} className={styles.leftBtnItem}>{props.name}</Button>
    </div>);
}