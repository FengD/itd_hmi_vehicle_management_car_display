import { Button } from '@alifd/next';
import React from 'react';

export default function RouteButton(props) {
    // console.log("name", props.name)
    return (<div>
        <Button type="secondary" >{props.name}</Button>
    </div>);
}