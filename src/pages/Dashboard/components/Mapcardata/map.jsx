import { Map, Marker, Polyline, Markers } from 'react-amap';
import React from 'react';
import styles from './index.module.scss';

function MyMap(props) {
  // console.log("myMap", props);
  const plugins = [
    // 'MapType',
    // 'Scale',
    // 'OverView',
    // 'ControlBar', // v1.1.0 新增
    {
      name: 'ToolBar',
      options: {
        visible: true,  // 不设置该属性默认就是 true
        onCreated(ins) {
          // console.log(ins);
        },
      },
    },
  ];

  function renderMarkerLayout() {
    // return <div style={style}>{extData.myLabel}</div>;
    return <div className={styles.startPoint}> <span className=" glyphicon glyphicon-map-marker  " /></div>;
    // return <span className=" glyphicon glyphicon-map-marker  " />;
    // return <span className=" glyphicon glyphicon-map-marker  "/>;
    // return <div style={styles.startPoint} />;
    // return <Marker
    //   icon={require('../../../../../public/car.png')}
    // />;
    // return <img src={require('../../../../../public/car.png')}  alt='111'/>;
  };

  const markersStartEvent = {
    click: (MapsOption, marker) => {
      // console.log(MapsOption);
      // console.log("myIndex", marker.getExtData().myIndex);
      // console.log(marker);
      // document.getElementById("endPoint").value = "(" + marker.B.position.lng + "," + marker.B.position.lat + ")";
      props.selectStartPoint([{
        longitude: marker.B.position.lng,
        latitude: marker.B.position.lat,
      }]);
      // marker.render(renderMarkerLayout);
    },
  };

  const markersEndEvent = {
    click: (MapsOption, marker) => {
      // give start point
      props.selectEndPoint([{
        longitude: marker.B.position.lng,
        latitude: marker.B.position.lat,
      }], props.startPoint.startMarkers);
    },
  };

  return (<div>
    <div style={{ width: '100%', height: window.innerHeight * 0.7 }}>
      <Map zoom={10} plugins={plugins} center={props.routeJson.center}>
        <Polyline
          path={props.routeJson.json}
        />
        <Marker
          position={props.carLocation}
          //
          icon={require('../../../../../public/car.png')}
        />
        <Markers
          markers={props.startPoint.startMarkers}
          events={markersStartEvent}
          // render={renderMarkerLayout}
        />
        <Markers
          markers={props.endPoint.endMarkers}
          events={markersEndEvent}
        />
        <Polyline
          path={props.endPoint.pointRoute}
          showDir={1}
        />
      </Map>
      {/* <Map amapkey={'5efaacc279af5490e4b90c7160cb29e8'}/> */}
    </div>
  </div>);
}

export default React.memo(MyMap);