import React from "react";
import "./styles.css";
// import * as d3 from "d3";

import Buttons from "./Buttons";
import SimpleNodes from "./SimpleNodes";

export default function App() {
  // d3.selectAll("h2").style("color", "blue");
  return (
    <div className="App">
      {/* <h1>Hello CodeSandbox</h1> */}
      {/* <h2>Start editing to see some magic happen!</h2> */}
      <Buttons />
      <SimpleNodes />
    </div>
  );
}
