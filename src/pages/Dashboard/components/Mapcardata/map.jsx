import { Map, Marker, Polyline, Markers } from 'react-amap';
import React from 'react';
import PubSub from 'pubsub-js';
  //1.09
  var markArr = [];
    
  const setRandomPosition = () => ({
    longitude: 100 + Math.random() * 20,
    latitude: 30 + Math.random() * 20
  });
  const setRandomMarker = (len) => (
    
    Array(len).fill(true).map((e, idx) => ({
      position: setRandomPosition(),
      myIndex: idx
    }))
  );

  const DrawMarker = (arr) => (
    
    Array(arr.length).fill(true).map((e, idx) => ({
      position: arr[idx],
      myIndex: idx
    }))
  );
  // var markers = [];
  // var positions = [[116.405467, 39.907761], [116.415467, 39.907761], [116.415467, 39.917761], [116.425467,
  //   39.907761], [116.385467, 39.907761]];
  //console.log(setRandomPosition().longitude);

  //1.09-end
export default class Mymap extends React.Component {
  
  constructor(props) {
    console.log("mapprops",props);
    super(props);
    this.state = {
      visible: true,
      position: { longitude: this.props.location["map"][0], latitude: this.props.location["map"][1] },
      path: this.props.location["json"],
      clickable: true,
      draggable: true,
      showDir: true,
      style: {strokeWeight:10},
      icon: "https://webapi.amap.com/images/car.png",
      //markers: setRandomMarker(10),
      center: setRandomPosition(),
    };
    //this.setRandomMarkers = this.setRandomMarkers.bind(this)
    // console.log("map_state", this.state);
    this.message = null;
    this.mapPlugins = ['ToolBar'];
    this.markerEvents = {
      click: () => {
        console.log('marker clicked!')
      }
    }
    
    
    

    
  }

  // setRandomMarkers() {
  //   this.setState({
  //     markers: randomMarker(10)
  //   })
  // }
  // toggleVisible() {
  //   this.setState({
  //     visible: !this.state.visible,
  //   });
  // }

  // changePosition() {
  //   this.setState({
  //     position: {
  //       longitude: 120 + Math.random() * 10,
  //       latitude: 35 + Math.random() * 10
  //     }
  //   });
  // }

  // toggleClickable() {
  //   this.setState({
  //     clickable: !this.state.clickable,
  //   });
  // }

  // toggleDraggable() {
  //   this.setState({
  //     draggable: !this.state.draggable,
  //   });
  // }
  


  selectStartPoint(){
    this.setState({
      markers: setRandomMarker(10),
    });
    this.markersEvents = {

      created:(instances) => {console.log(instances.length)},
      click: (MapsOption, marker) => {
        console.log('MapsOptions:');
        console.log(MapsOption);
        console.log('marker:');
        console.log(marker.getExtData().myIndex);//确定点击的是哪个点
        //设置marker的样式，包括颜色和字体

        // 
        // for (var i = 9; i > -1; i--) {
        //   if(i == marker.getExtData().myIndex){
        //     marker.B.visible = false;
        //     //console.log(marker.B.visible);
        //   }
        // }
        
        console.log(marker);
        document.getElementById("startPoint").value = "(" + marker.B.position.lng + "," + marker.B.position.lat + ")";
        //marker.setMap(null);
        this.setState({
          markers: [{position:{longitude: marker.B.position.lng,
            latitude: marker.B.position.lat}}],
          
        });
        markArr[0]={longitude: marker.B.position.lng,latitude: marker.B.position.lat};
        
      },
      
      //dragend: (MapsOption, marker) => { /* ... */ },

      
    }
  }

  selectEndPoint(){
    this.setState({
      markers: setRandomMarker(10),
    });
    this.markersEvents = {

      created:(instances) => {console.log(instances.length)},
      click: (MapsOption, marker) => {
        console.log('MapsOptions:');
        console.log(MapsOption);
        console.log('marker:');
        console.log(marker.getExtData().myIndex);//确定点击的是哪个点
        //设置marker的样式，包括颜色和字体

        // 
        // for (var i = 9; i > -1; i--) {
        //   if(i == marker.getExtData().myIndex){
        //     marker.B.visible = false;
        //     //console.log(marker.B.visible);
        //   }
        // }
        
        console.log(marker);
        document.getElementById("endPoint").value = "(" + marker.B.position.lng + "," + marker.B.position.lat + ")";
        //marker.setMap(null);
        this.setState({
          markers: [{position:{longitude: marker.B.position.lng,
            latitude: marker.B.position.lat}}],
        });
        markArr[1]={longitude: marker.B.position.lng,latitude: marker.B.position.lat};
        //console.log(markArr);
      },
      
      //dragend: (MapsOption, marker) => { /* ... */ },

      
    }
  }

  drawLine(){
    console.log(markArr);
    this.setState({
      markers: DrawMarker(markArr),
    });
    this.setState({
      path: markArr
    });
  }

  // componentDidMount() {
  //   console.log('componentDidMount');
  //   PubSub.subscribe('send-data', (msg, data) => {
  //     if(data != null)
  //     {
  //       this.setState({
  //         position: {
  //           longitude: data[0],
  //           latitude: data[1]
  //         }
  //       });
  //       console.log("position",this.state.position);
  //     }
  //   });
  // }

  componentWillReceiveProps() {
    console.log("this.props.location",this.props.location);
    this.setState(
      {
        position: { longitude: this.props.location["map"][0], latitude: this.props.location["map"][1] },
        path: this.props.location["json"],
      },
    )
  }

  // componentWillUnmount() {
  //   PubSub.unsubscribe('send-data');
  // }

  render() {
    console.log("this.state.markers",this.state.markers);
    return <div>
      <div style={{ width: '100%', height: window.innerHeight*0.7 }}>
        <Map plugins={this.mapPlugins} center={this.state.position} zoom={1}>
          <Polyline
            path={this.state.path}
            showDir = {this.state.showDir}
            style ={this.state.style}
          />
          <Marker
            events={this.markerEvents}
            position={this.state.position}
            visible={this.state.visible}
            clickable={this.state.clickable}
            draggable={this.state.draggable}
            icon = {this.state.icon}
          />
          <Markers 
            markers={this.state.markers}
            events = {this.markersEvents}
          />
          <Markers 
            markers={this.state.markers1}
            events = {this.markersEvents1}
          />
          
        </Map>
        {/* <Map amapkey={'5efaacc279af5490e4b90c7160cb29e8'}/> */}
      </div>
      {/* <button onClick={() => { this.toggleVisible() }}>Visible</button>
      <button onClick={() => { this.toggleClickable() }}>Clickable</button>
      <button onClick={() => { this.toggleDraggable() }}>Draggable</button> */}

      <button onClick={() => { this.selectStartPoint() }}>请选择起点</button>
      <input type="text" placeholder="起点经纬度" readonly="readonly" id="startPoint"/>

      <button onClick={() => { this.selectEndPoint() }}>请选择终点</button>
      <input type="text" placeholder="终点经纬度" readonly="readonly" id="endPoint"/>
      <button onClick={() => { this.drawLine() }}>确定</button>
    </div>
  }
}

// ReactDOM.render(
//   <App/>, mountNode
// )