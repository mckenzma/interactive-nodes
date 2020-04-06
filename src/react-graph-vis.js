import React from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";

import "./styles.css";
// need to import the vis network css in order to show tooltip
// not sure where to find this...
import "./network.css";

export default function ReactGraphVis() {
  const graph = {
    nodes: [
      { id: "1", label: "Node 1", title: "node 1 tootip text", x: 0, y: 0 },
      { id: "2", label: "Node 2", title: "node 2 tootip text", x: 0, y: 100 },
      { id: "3", label: "Node 3", title: "node 3 tootip text", x: 0, y: -100 },
      {
        id: "4",
        label: "Node 4",
        title: "node 4 tootip text",
        x: -100,
        y: 200
      },
      { id: "5", label: "Node 5", title: "node 5 tootip text", x: 100, y: 200 }
    ],
    edges: [
      { from: "1", to: "2" },
      { from: "1", to: "3" },
      { from: "2", to: "4" },
      { from: "2", to: "5" },
      { from: "5", to: "5" }
    ]
  };

  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: "#000000"
    },
    height: "500px",
    nodes: {
      fixed: {
        x: true,
        y: true
      }
    }
  };

  const events = {
    select: function(event) {
      var { nodes, edges } = event;
    }
  };
  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      getNetwork={network => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
      }}
    />
  );
}
