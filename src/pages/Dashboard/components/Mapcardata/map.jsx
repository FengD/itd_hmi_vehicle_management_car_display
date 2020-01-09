import { Map, Marker, Polyline } from 'react-amap';
import React from 'react';
import PubSub from 'pubsub-js';

export default class Mymap extends React.Component {
  constructor(props) {
    console.log("mapprops", props.mapdata);
    super(props);
    this.state = {
      position: this.props.mapdata["map"],
      path: this.props.mapdata["json"],
      center: this.props.mapdata["map"],
    };
    // console.log("map_state", this.state);
  }

  componentDidMount() {
    console.log('componentDidMount');
    // setInterval(() => {
    //   var lat = 39 + Math.random()
    //   var long = 116 + Math.random();
    //   this.setState(
    //     {
    //       position: {
    //         longitude: long,
    //         latitude: lat,
    //       },
    //       center: {
    //         longitude: long,
    //         latitude: lat,
    //       },
    //     })
    // }, 1000);
  }

  componentWillReceiveProps() {
    console.log("this.props.mapdata changed", this.props.mapdata);
    this.setState(
      {
        position: {
          longitude: this.props.mapdata["map"]["longitude"],
          latitude: this.props.mapdata["map"]["latitude"]
        },
        // position: this.props.mapdata["map"],
        path: this.props.mapdata["json"],
        center: this.props.mapdata["center"],
      })
    // this.setState(this.props.mapdata);
    console.log("mapState1", this.state);
  }

  render() {
    console.log("mapState2", this.state);
    return <div>
      <div style={{ width: '100%', height: window.innerHeight * 0.7 }}>
        <Map plugins={this.mapPlugins} center={this.state.center} zoom={20}>
          <Polyline
            path={this.state.path}
          />
          <Marker
            position={this.state.position}
          // position={this.props.mapdata["map"]}
          />
        </Map>
        {/* <Map amapkey={'5efaacc279af5490e4b90c7160cb29e8'}/> */}
      </div>
    </div>
  }
}