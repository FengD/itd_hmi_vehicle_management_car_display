import { Button } from '@alifd/next';
import React, { useEffect } from 'react';

export default function RouteButton(props) {
    var styleBtn = {
        color:'#d43c43',
        width:150,
        margin:10,
    };
    console.log("name", props.name)
    return (<div>
        <Button type="secondary" style={styleBtn}>{props.name[1]}</Button>
    </div>);
}