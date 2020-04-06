import React from "react";
import "./styles.css";
// import * as d3 from "d3";

import Buttons from "./Buttons";
import SimpleNodes from "./SimpleNodes";
import ReactGraphVis from "./react-graph-vis";

export default function App() {
  // d3.selectAll("h2").style("color", "blue");
  return (
    <div className="App">
      {/* <Buttons /> */}
      {/* <SimpleNodes /> */}
      <ReactGraphVis />
    </div>
  );
}
