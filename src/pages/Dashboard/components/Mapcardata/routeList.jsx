import { Button } from '@alifd/next';
import React from 'react';
import styles from './index.module.scss';

export default function RouteList(props) {
    // console.log("RouteList", props);
    return (
        props.routeList.map((route) =>
            (<div 
                key={Math.random()}>
                <Button className={styles.RouteList} name={route.name} />
            </div>)
        ));
}