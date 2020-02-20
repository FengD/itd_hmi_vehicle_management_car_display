import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";

// var ws = new WebSocket('ws://localhost:8080');
// ws.onopen = function () {
//   console.log('client: ws connection is open');
//   ws.send('hello');
// };

export default class Basicanimated extends React.Component {
  render() {
    var data = [
      {
        year: "1991",
        value: 100
      },
      {
        year: "1992",
        value: 4
      },
      {
        year: "1993",
        value: 3.5
      },
      {
        year: "1994",
        value: 5
      }]

    class Basic extends React.Component {
      constructor() {
        super();
        this.state = {
          data
        };
      }

      // componentDidMount() {
      //   const _this = this;
      //   ws.onmessage = function (e) {
      //     console.log('client: received %s', e.data);
      //     _this.setState({
      //       data: JSON.parse(e.data)
      //     });
      //   };
      // }

      render() {
        // console.log(data);
        const cols = {
          value: {
            min: 0
          },
          year: {
            range: [0, 1]
          }
        };
        return (
          <div>
            <Chart height={400} data={this.state.data} scale={cols} forceFit>
              <Axis name="year" />
              <Axis name="value" />
              <Tooltip
                crosshairs={{
                  type: "y"
                }}
              />
              <Geom type="line" position="year*value" size={2} />
              <Geom
                type="point"
                position="year*value"
                size={4}
                shape={"circle"}
                style={{
                  stroke: "#fff",
                  lineWidth: 1
                }}
              />
            </Chart>
          </div>
        );
      }
    }
    return (
      <div>
        <Basic />
      </div>
    );
  }
}


