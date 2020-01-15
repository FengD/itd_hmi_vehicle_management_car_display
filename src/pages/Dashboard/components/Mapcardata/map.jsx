import { Map, Marker, Polyline } from 'react-amap';
import React from 'react';
// import PubSub from 'pubsub-js';

export default function Mymap(props) {
  console.log("this.props.mapdata", props.mapdata);
  return (<div>
    <div style={{ width: '100%', height: window.innerHeight * 0.7 }}>
      <Map center={props.mapdata.center} zoom={20}>
        <Polyline
          path={props.mapdata.json}
        />
        <Marker
          position={props.mapdata.map}
        />
      </Map>
      {/* <Map amapkey={'5efaacc279af5490e4b90c7160cb29e8'}/> */}
    </div>
  </div>);
}