import styles from './index.module.scss';
import { Button } from '@alifd/next';
import React from 'react';

export default function RouteButton(props) {
    var styleBtn = {
        width:150

    };
    console.log("name", props.name)
    return (<div className={styles.leftBtn}>
        <Button type="secondary" style={styleBtn } className={styles.leftBtnItem}>{props.name[1]}</Button>
    </div>);
}