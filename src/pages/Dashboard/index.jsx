import React from 'react';
import Overview from './components/Overview';
import Mapcardata from './components/Mapcardata/index_function';
import Datacharts from './components/Datacharts';
import TopActiveChart from './components/TopActiveChart';

export default function Dashboard() {
  return (
    <div>
      <Overview />
      <Mapcardata />
      {/* <Datacharts /> */}
      {/* <TopActiveChart /> */}
    </div>
  );
}
