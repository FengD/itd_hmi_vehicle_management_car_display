import { Map, Marker, Polyline, Markers } from 'react-amap';
import React from 'react';
// import PubSub from 'pubsub-js';

export default function Mymap(props) {

  const markersStartEvent = {
    click: (MapsOption, marker) => {
      console.log(MapsOption);
      // console.log("myIndex", marker.getExtData().myIndex);
      console.log(marker);
      // document.getElementById("endPoint").value = "(" + marker.B.position.lng + "," + marker.B.position.lat + ")";
      props.selectStartPoint([{
        longitude: marker.B.position.lng,
        latitude: marker.B.position.lat,
      }]);
    },
  };

  const markersEndEvent = {
    click: (MapsOption, marker) => {
      // give start point
      props.selectEndPoint([{
        longitude: marker.B.position.lng,
        latitude: marker.B.position.lat,
      }], props.mapdata.startMarkers);
    },
  };

  console.log("this.props.mapdata", props.mapdata);
  return (<div>
    <div style={{ width: '100%', height: window.innerHeight * 0.7 }}>
      <Map center={props.mapdata.center} zoom={5}>
        <Polyline
          path={props.mapdata.json}
        />
        <Marker
          position={props.mapdata.map}
        />
        <Markers
          markers={props.mapdata.startMarkers}
          events={markersStartEvent}
        />
        <Markers
          markers={props.mapdata.endMarkers}
          events={markersEndEvent}
        />
        <Polyline
          path={props.mapdata.pointRoute}
          showDir={1}
        />
      </Map>
      {/* <Map amapkey={'5efaacc279af5490e4b90c7160cb29e8'}/> */}
    </div>
  </div>);
}