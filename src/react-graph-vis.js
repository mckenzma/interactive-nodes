import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";
// import vis-network from "vis-network";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import "./styles.css";
// need to import the vis network css in order to show tooltip
import "./network.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    // height: 140,
    height: "100%",
    // width: 100
    width: "100%"
  },
  control: {
    padding: theme.spacing(2)
  }
}));

export default function ReactGraphVis() {
  const classes = useStyles();

  const [selectedNode, setSelectedNode] = useState("");

  const graph = {
    nodes: [
      {
        id: "1",
        cid: ["L1"],
        label: "Node 1",
        title: "node 1 tootip text",
        x: 0,
        y: 0
      },
      {
        id: "2",
        cid: ["L1"],
        label: "Node 2",
        title: "node 2 tootip text",
        x: 0,
        y: 100
      },
      {
        id: "3",
        cid: ["L2"],
        label: "Node 3",
        title: "node 3 tootip text",
        x: 0,
        y: -100
      },
      {
        id: "4",
        cid: ["L2"],
        label: "Node 4",
        title: "node 4 tootip text",
        x: -100,
        y: 200
      },
      {
        id: "5",
        cid: ["L3"],
        label: "Node 5",
        title: "node 5 tootip text",
        x: 100,
        y: 200
      }
    ],
    edges: [
      { from: "1", to: "2", label: "Rel 1" },
      { from: "1", to: "3", label: "Rel 2" },
      { from: "2", to: "4", label: "Rel 3" },
      { from: "2", to: "5", label: "Rel 4" },
      { from: "5", to: "5", label: "Rel 5" },
      { from: "1", to: "4", label: "Rel 6" },
      { from: "5", to: "3", label: "Rel 7" }
    ]
  };

  const buttons = Object.values(graph)[0] // [0] = nodes
    .map(n => n.cid.map(g => g))
    .flat()
    .sort()
    .reduce((unique, item) => {
      return unique.includes(item) ? unique : [...unique, item];
    }, []);

  const options = {
    // autoresize: true,
    layout: {
      hierarchical: false
    },
    edges: {
      color: "#000000",
      smooth: {
        enabled: true,
        type: "discrete",
        roundness: 0.5
      }
    },
    height: "500px",
    nodes: {
      color: {
        border: "#000000",
        background: "#00aaff",
        hover: {
          border: "#FFFFFF",
          background: "#000000"
        }
      },
      fixed: {
        x: true,
        y: true
      }
    },
    interaction: {
      hover: true
    }
  };

  const events = {
    // select: function(event) {
    //   var { nodes, edges } = event;
    // },
    hoverNode: function(event) {
      var { nodes, edges } = event;
      // console.log(event, event.node);
      setSelectedNode(event.node);
    }
  };
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <Paper className={classes.paper}>
              {buttons.map(b => {
                return (
                  <Button
                    key={b}
                    style={{ opacity: 0.5 }}
                    // onMouseEnter={e => increaseOpacity(e, '2b')}
                    // onMouseLeave={e => decreaseOpacity(e)}
                  >
                    {b}
                  </Button>
                );
              })}
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Graph
            graph={graph}
            options={options}
            events={events}
            getNetwork={network => {
              //  if you want access to vis.js network api you can set the state in a parent component using this property
              console.log(network.getSelectedNodes(selectedNode));
            }}
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>Generate pseudo-cypher here</Paper>
      </Grid>
    </Grid>
  );
}
