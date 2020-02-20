import { Button } from "@alifd/next";
import React from 'react';

export default function Test(props) {
    console.log("props",props);
    return (
        <div>
            <Button>{props.data} </Button>
            <Button>{1} </Button>
        </div>
    );
};