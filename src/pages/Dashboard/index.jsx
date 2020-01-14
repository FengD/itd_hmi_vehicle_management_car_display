import React, { useEffect } from 'react';
// import Overview from './components/Overview';
import Mapcardata from './components/Mapcardata/index_function';
// import Datacharts from './components/Datacharts';
// import TopActiveChart from './components/TopActiveChart';

export default function Dashboard(props) {
  useEffect(() => {
    if (localStorage.getItem('loginStatus') !== '200') {
      props.history.push('/notfound');
    }
  }, [props.history]);
  return (
    <div>
      {/* <Overview /> */}
      <Mapcardata />
      {/* <Datacharts /> */}
      {/* <TopActiveChart /> */}
    </div>
  );
}
