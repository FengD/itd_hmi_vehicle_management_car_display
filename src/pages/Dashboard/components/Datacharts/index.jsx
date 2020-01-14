// import React, { useEffect, useState, useRef } from 'react';
// import IceContainer from '@icedesign/container';
// import { Progress, Grid } from '@alifd/next';
// import styles from './index.module.scss';
// import Columnanimated from './Columnanimated'
// import Gauge from './tabletest'
// import Basicanimated from './Basic'

// const { Row, Col } = Grid;
// export default function Datacharts() {
//   // var speed_status = "none";
//   // const speed_status = useState("none");
//   const [speed_status, set_speed_status] = useState("hidden");
//   // const speed_status_ref = useRef(speed_status);

//   useEffect(() => {
//     PubSub.subscribe('speed_status', (msg, data) => {
//       if (data != null) {
//         if (data == "false") {
//           set_speed_status("hidden");
//         }
//         else (data == "true")
//         {
//           set_speed_status("visible");
//         }
//         console.log("speed_status", data);
//       }
//     });
//     return function cleanup() {
//       PubSub.unsubscribe('speed_status');
//     }
//   }, []);

//   return (
//     <Row wrap gutter="20">

//       <Col xxs="12" s="12" l="8">
//         <IceContainer style={{ visibility: speed_status }}>
//           <div className={styles.test}>
//             <Columnanimated />
//           </div>

//         </IceContainer>
//       </Col>

      
//         {/* <Col xxs="12" s="12" l="8">
//           <IceContainer style={{ visibility: speed_status }}>
//             <Gauge></Gauge>
//           </IceContainer>
//         </Col> */}

//       {/* <div id='speed' style={{ visibility: speed_status }}> */}
//       <Col xxs="12" s="12" l="8">
//         <IceContainer >
//           {/* <div className={styles.item}> */}
//           {/* <Progress
//               percent={100}
//               shape="circle"
//               state="success"
//               size="large"
//             />
//             <h6 className={styles.title}>设备 C</h6> */}
//           <Basicanimated></Basicanimated>
//           {/* </div> */}
//         </IceContainer>
//       </Col>
//       {/* </div> */}

//     </Row>
//   );
// }
