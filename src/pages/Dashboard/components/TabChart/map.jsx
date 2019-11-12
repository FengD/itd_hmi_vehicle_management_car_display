import { Map, Marker } from 'react-amap';
import React from 'react';

export default class Mymap extends React.Component{
  constructor(){
    super();
    this.state = {
      visible: true,
      position: {longitude: 120, latitude: 35 },
      clickable: true,
      draggable: true,
    };
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
  
  changePosition(){
    this.setState({
      position: { 
        longitude: 120 + Math.random() * 10 , 
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
  
  render(){   
    return <div>
      <div style={{width: '100%', height: 600}}>
        <Map plugins={this.mapPlugins} center={this.state.position} zoom={6}>
          <Marker
            events={this.markerEvents}
            position={this.state.position} 
            visible={this.state.visible}
            clickable={this.state.clickable}
            draggable={this.state.draggable}
          />
        </Map>
      </div>
      <button onClick={() => {this.toggleVisible() }}>Visible</button>
      <button onClick={() => {this.randomPosition() }}>Position</button>
      <button onClick={() => {this.toggleClickable() }}>Clickable</button>
      <button onClick={() => {this.toggleDraggable() }}>Draggable</button>
    </div>
  }
}

// ReactDOM.render(
//   <App/>, mountNode
// )