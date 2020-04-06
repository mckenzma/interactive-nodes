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

  const [nodes, setNodes] = useState([
    {
      id: "1",
      cid: ["G1"],
      label: "Node_1",
      title: "node 1 tootip text",
      x: 0,
      y: 0,
      color: {
        border: "#000000",
        background: "#ccccff",
        // background: null
        hover: {
          border: "#000000",
          background: "#5151fc"
        },
        highlight: {
          border: "#000000",
          background: "#5151fc"
        }
      }
    },
    {
      id: "2",
      cid: ["G1"],
      label: "Node_2",
      title: "node 2 tootip text",
      x: 0,
      y: 100,
      color: {
        border: "#000000",
        background: "#ccccff",
        // background: null
        hover: {
          border: "#000000",
          background: "#5151fc"
        },
        highlight: {
          border: "#000000",
          background: "#5151fc"
        }
      }
    },
    {
      id: "3",
      cid: ["G2"],
      label: "Node_3",
      title: "node 3 tootip text",
      x: 0,
      y: -100,
      color: {
        border: "#000000",
        background: "#ccccff",
        // background: null
        hover: {
          border: "#000000",
          background: "#5151fc"
        },
        highlight: {
          border: "#000000",
          background: "#5151fc"
        }
      }
    },
    {
      id: "4",
      cid: ["G2"],
      label: "Node_4",
      title: "node 4 tootip text",
      x: -100,
      y: 200,
      color: {
        border: "#000000",
        background: "#ccccff",
        // background: null
        hover: {
          border: "#000000",
          background: "#5151fc"
        },
        highlight: {
          border: "#000000",
          background: "#5151fc"
        }
      }
    },
    {
      id: "5",
      cid: ["G3"],
      label: "Node_5",
      title: "node 5 tootip text",
      x: 100,
      y: 200,
      color: {
        border: "#000000",
        background: "#ccccff",
        // background: null
        hover: {
          border: "#000000",
          background: "#5151fc"
        },
        highlight: {
          border: "#000000",
          background: "#5151fc"
        }
      }
    }
  ]);

  const [edges, setEdges] = useState([
    { from: "1", to: "2", label: "Rel_1" },
    { from: "1", to: "3", label: "Rel_2" },
    { from: "2", to: "4", label: "Rel_3" },
    { from: "2", to: "5", label: "Rel_4" },
    { from: "5", to: "5", label: "Rel_5" },
    { from: "1", to: "4", label: "Rel_6" },
    { from: "5", to: "3", label: "Rel_7" }
  ]);

  const [pseudoCypher, setPseudoCypher] = useState([]);

  const [graph, setGraph] = useState({
    nodes: nodes,
    // nodes: [
    //   {
    //     id: "1",
    //     cid: ["G1"],
    //     label: "Node 1",
    //     title: "node 1 tootip text",
    //     x: 0,
    //     y: 0
    //     // color: {
    //     //   border: "#000000",
    //     //   background: "#ccccff"
    //     //   // hover: {
    //     //   //   border: "#000000",
    //     //   //   background: "#5151fc"
    //     //   // },
    //     //   // highlight: {
    //     //   //   border: "#000000",
    //     //   //   background: "#5151fc"
    //     //   // }
    //     // }
    //   },
    //   {
    //     id: "2",
    //     cid: ["G1"],
    //     label: "Node 2",
    //     title: "node 2 tootip text",
    //     x: 0,
    //     y: 100
    //   },
    //   {
    //     id: "3",
    //     cid: ["G2"],
    //     label: "Node 3",
    //     title: "node 3 tootip text",
    //     x: 0,
    //     y: -100
    //   },
    //   {
    //     id: "4",
    //     cid: ["G2"],
    //     label: "Node 4",
    //     title: "node 4 tootip text",
    //     x: -100,
    //     y: 200
    //   },
    //   {
    //     id: "5",
    //     cid: ["G3"],
    //     label: "Node 5",
    //     title: "node 5 tootip text",
    //     x: 100,
    //     y: 200
    //   }
    // ],
    edges: edges
    // edges: [
    //   { from: "1", to: "2", label: "Rel 1" },
    //   { from: "1", to: "3", label: "Rel 2" },
    //   { from: "2", to: "4", label: "Rel 3" },
    //   { from: "2", to: "5", label: "Rel 4" },
    //   { from: "5", to: "5", label: "Rel 5" },
    //   { from: "1", to: "4", label: "Rel 6" },
    //   { from: "5", to: "3", label: "Rel 7" }
    // ]
  });

  // console.log("graph", graph);

  // trying to get connected nodes to highglight when hover
  // var connectedNodes = graph.edges;
  // console.log(graph.edges.map(e => e.from + "-[:" + e.label + "]->" + e.to));
  // console.log(connectedNodes);
  // graph["connectedNodes"] = connectedNodes;
  // console.log(graph);

  const buttons = Object.values(graph)[0] // [0] = nodes
    .map(n => n.cid.map(g => g))
    .flat()
    .sort()
    .reduce((unique, item) => {
      return unique.includes(item) ? unique : [...unique, item];
    }, []);

  const options = {
    autoResize: true,
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
        background: "#ffffff",
        hover: {
          border: "#000000",
          // background: "#5151fc"
          background: "#ffffff"
        },
        highlight: {
          border: "#000000",
          // background: "#5151fc"
          background: "#ffffff"
        }
      },
      fixed: {
        x: true,
        y: true
      }
    },
    interaction: {
      hover: true,
      hoverConnectedEdges: true,
      selectable: true,
      selectConnectedEdges: true
    }
  };

  const events = {
    // select: function(event) {
    //   var { nodes, edges } = event;
    // },
    hoverNode: function(event) {
      var { nodes, edges /*, connectedNodes*/ } = event;
      // console.log(event, event.node);
      highlightConnectedNodes(event, event.node);
      // console.log(graph.getConnectedNodes(event.node));
      generatePseudoCypher(event.node);
    }
  };

  function highlightConnectedNodes(e, key) {
    // console.log("Node id hovered: ", key);
    var node = graph.nodes.find(n => n.id === key);
    console.log("node", node);
    var array = [key];

    //TODO add other nodes from edges to 'array'

    var updated = graph.nodes;
    console.log("updated", updated);

    for (var i = 0; i < updated.length; i++) {
      for (var j = 0; j < array.length; j++) {
        // console.log(updated[i].id, array[j]);
        if (updated[i].id !== array[j]) {
          console.log(updated[i]);
          updated[i].color = {
            background: "#000000"
          };
        }
      }
    }

    setNodes([...updated]);
  }

  // console.log("nodes", nodes);

  function generatePseudoCypher(key) {
    // console.log("Create cypher");
    var rels = edges.filter(r => r.from === key || r.to === key);
    // console.log("rels", rels, rels.length);

    var updated = [];
    // var start, end;

    for (var i = 0; i < rels.length; i++) {
      for (var j = 0; j < nodes.length; j++) {
        if (rels[i].from === nodes[j].id) {
          var start = nodes[j];
        }
      }
      for (var k = 0; k < nodes.length; k++) {
        if (rels[i].to === nodes[k].id) {
          var end = nodes[k];
        }
      }
      // console.log("start", start, "end", end);
      updated.push(
        "(:" + start.label + ")-[:" + rels[i].label + "]->(:" + end.label + ")"
      );
    }

    // console.log("updated", updated);

    // setPseudoCypher(["blah", "bleh"]);
    setPseudoCypher([...updated]);
  }

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
            }}
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <p>Generate pseudo-cypher here</p>
          {pseudoCypher.map((cypher, index) => {
            return <p key={index}>{cypher}</p>;
          })}
        </Paper>
      </Grid>
    </Grid>
  );
}
