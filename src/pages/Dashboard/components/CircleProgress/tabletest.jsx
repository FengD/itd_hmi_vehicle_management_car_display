// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Coord, Geom, Guide, Shape } from 'bizcharts';

const { Html, Arc } = Guide;

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START

Shape.registerShape('point', 'pointer', {
  drawShape(cfg, group) {
    let point = cfg.points[0]; // 获取第一个标记点
    point = this.parsePoint(point);
    const center = this.parsePoint({ // 获取极坐标系下画布中心点
      x: 0,
      y: 0,
    });
    // 绘制指针
    group.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: point.x,
        y2: point.y - 20,
        stroke: cfg.color,
        lineWidth: 5,
        lineCap: 'round',
      },
    });
    return group.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 12,
        stroke: cfg.color,
        lineWidth: 4.5,
        fill: '#fff',
      },
    });
  },
});

const cols = {
    value: {
      min: 0,
      max: 10,
      tickInterval: 1,
      nice: true,
    },
  };

export default class Gaugeanimated extends React.Component {

  render() {
  var data = [];
  var getValue = (function() {
    var value = 0;
    console.log(value);
    return function() {
      // var ws = new WebSocket('ws://localhost:8080');
      // ws.onopen = function () {
      // console.log('client: ws connection is open');
      // ws.send('hello');
      // };
      // ws.onmessage = function (e) {
      //   console.log('client: received %s', e.data);
      //   return e.data;
      // };
      var result = Math.random().toFixed(2)
      return result;
    };
  })();
 
  data.push({
      value: getValue() * 10
  });
  
    class Gauge extends React.Component {
      constructor() {
        super();
        this.state = {
          data
        };
      }

      componentDidMount() {
        const _this = this;

        setInterval(function() {
          // getValue();
          const newData = data.map(function(item) {
            return {
              value: getValue() * 10,
              month: item.month
            };
          });

          _this.setState({
            data: newData
          });
        }, 1000);

      }

        render() {
          return (
            <Chart height={window.innerHeight} data={this.state.data} scale={cols} padding={[0, 0, 200, 0]} forceFit>
              <Coord type="polar" startAngle={-9 / 8 * Math.PI} endAngle={1 / 8 * Math.PI} radius={0.75} />
              <Axis
                name="value"
                zIndex={2}
                line={null}
                label={{
                  offset: -16,
                  textStyle: {
                    fontSize: 18,
                    textAlign: 'center',
                    textBaseline: 'middle',
                  },
                }}
                subTickCount={4}
                subTickLine={{
                  length: -8,
                  stroke: '#fff',
                  strokeOpacity: 1,
                }}
                tickLine={{
                  length: -18,
                  stroke: '#fff',
                  strokeOpacity: 1,
                }}
              />
              <Axis name="1" visible={false} />
              <Guide>
                <Arc
                  zIndex={0}
                  // start={[0, 1]}
                  // end={[9, 1]}
                  start={[0, 0.965]}
                  end={[9, 0.965]}
                  style={{ // 底灰色
                    stroke: '#CBCBCB',
                    lineWidth: 18,
                  }}
                />
                <Arc
                  zIndex={1}
                  // start={[0, 0.965]}
                  // end={[this.state.data[0].value, 1]}
                  start={[0, 0.965]}
                  end={[this.state.data[0].value, 0.965]}
                  style={{
                    stroke: '#1890FF',
                    lineWidth: 18,
                  }}
                />
                <Html
                  position={['50%', '95%']}
                  html={() => (`<div style="width: 300px;text-align: center;font-size: 12px!important;"><p style="font-size: 1.75em; color: rgba(0,0,0,0.43);margin: 0;">合格率</p><p style="font-size: 3em;color: rgba(0,0,0,0.85);margin: 0;">${this.state.data[0].value * 10}%</p></div>`)}
                />
              </Guide>
              <Geom
                type="point"
                position="value*1"
                shape="pointer"
                color="#1890FF"
                active={false}
                style={{ stroke: '#fff', lineWidth: 1 }}
              />
            </Chart>
          );
        }
      }

    return (
        <div>
            <Gauge />
        </div>
    ) 
    }
}


