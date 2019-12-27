import { Map, Marker, Polyline } from 'react-amap';
import React from 'react';
import PubSub from 'pubsub-js';

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
    };
    // console.log("map_state", this.state);
    this.message = null;
    this.mapPlugins = ['ToolBar'];
    this.markerEvents = {
      click: () => {
        console.log('marker clicked!')
      }
    }
  }

  toggleVisible() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  changePosition() {
    this.setState({
      position: {
        longitude: 120 + Math.random() * 10,
        latitude: 35 + Math.random() * 10
      }
    });
  }

  toggleClickable() {
    this.setState({
      clickable: !this.state.clickable,
    });
  }

  toggleDraggable() {
    this.setState({
      draggable: !this.state.draggable,
    });
  }

  componentDidMount() {
    // console.log('componentDidMount');
    // PubSub.subscribe('send-data', (msg, data) => {
    //   if(data != null)
    //   {
    //     this.setState({
    //       position: {
    //         longitude: data[0],
    //         latitude: data[1]
    //       }
    //     });
    //     console.log("position",this.state.position);
    //   }
    // });
  }

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
    return <div>
      <div style={{ width: '100%', height: window.innerHeight*0.7 }}>
        <Map plugins={this.mapPlugins} center={this.state.position} zoom={20}>
          <Polyline
            path={this.state.path}
          />
          <Marker
            events={this.markerEvents}
            position={this.state.position}
            visible={this.state.visible}
            clickable={this.state.clickable}
            draggable={this.state.draggable}
          />
        </Map>
        {/* <Map amapkey={'5efaacc279af5490e4b90c7160cb29e8'}/> */}
      </div>
      <button onClick={() => { this.toggleVisible() }}>Visible</button>
      <button onClick={() => { this.toggleClickable() }}>Clickable</button>
      <button onClick={() => { this.toggleDraggable() }}>Draggable</button>
    </div>
  }
}

// ReactDOM.render(
//   <App/>, mountNode
// )