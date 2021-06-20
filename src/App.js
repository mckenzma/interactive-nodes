import React from 'react';
import './styles.css';
// import * as d3 from "d3";
import CSVToJSON from 'csvtojson';
// import FileSystem from "fs";
// import * as source from "./source.csv";

import Buttons from './Buttons';
import SimpleNodes from './SimpleNodes';
import ReactGraphVis from './react-graph-vis';

import Grid from '@material-ui/core/Grid';

export default function App() {
  // d3.selectAll("h2").style("color", "blue");

  // console.log(source);

  // CSVToJSON()
  //   .fromFile("./source.csv")
  //   .then(source => {
  //     console.log(source);
  //   });

  return (
    <div className="App">
      <SimpleNodes />
      <ReactGraphVis />
    </div>
  );
}
