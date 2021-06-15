import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import ReactDOM from "react-dom";
import Graph from 'react-graph-vis';
// import { Network } from "vis-network";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import './styles.css';
// need to import the vis network css in order to show tooltip
import './network.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    // height: 140,
    height: '100%',
    // width: 100
    width: '100%'
  },
  control: {
    padding: theme.spacing(2)
  }
}));

export default function ReactGraphVis() {
  const classes = useStyles();

  const [nodes, setNodes] = useState([
    {
      id: '1',
      cid: ['G1'],
      label: 'Node_1',
      title: 'node 1 tootip text',
      x: 0,
      y: 0,
      color: {
        border: '#000000',
        background: '#ccccff'
        // hover: {
        //   border: "#000000",
        //   background: "#5151fc"
        // },
        // highlight: {
        //   border: "#000000",
        //   background: "#5151fc"
        // },
      }
    },
    {
      id: '2',
      cid: ['G1'],
      label: 'Node_2',
      title: 'node 2 tootip text',
      x: 0,
      y: 100,
      color: {
        border: '#000000',
        background: '#ccccff'
        // hover: {
        //   border: "#000000",
        //   background: "#5151fc"
        // },
        // highlight: {
        //   border: "#000000",
        //   background: "#5151fc"
        // }
      }
    },
    {
      id: '3',
      cid: ['G2'],
      label: 'Node_3',
      title: 'node 3 tootip text',
      x: 0,
      y: -100,
      color: {
        border: '#000000',
        background: '#ccccff'
        // hover: {
        //   border: "#000000",
        //   background: "#5151fc"
        // },
        // highlight: {
        //   border: "#000000",
        //   background: "#5151fc"
        // }
      }
    },
    {
      id: '4',
      cid: ['G2'],
      label: 'Node_4',
      title: 'node 4 tootip text',
      x: -100,
      y: 200,
      color: {
        border: '#000000',
        background: '#ccccff'
        // hover: {
        //   border: "#000000",
        //   background: "#5151fc"
        // },
        // highlight: {
        //   border: "#000000",
        //   background: "#5151fc"
        // }
      }
    },
    {
      id: '5',
      cid: ['G3'],
      label: 'Node_5',
      title: 'node 5 tootip text',
      x: 100,
      y: 200,
      color: {
        border: '#000000',
        background: '#ccccff'
        /*hover: {
          border: "#000000",
          background: "#5151fc"
        },
        highlight: {
          border: "#000000",
          background: "#5151fc"
        }*/
      }
    }
  ]);
  // console.log("nodes", nodes);

  const [edges, setEdges] = useState([
    { from: '1', to: '2', label: 'Rel_1' },
    { from: '1', to: '3', label: 'Rel_2' },
    { from: '2', to: '4', label: 'Rel_3' },
    { from: '2', to: '5', label: 'Rel_4' },
    { from: '5', to: '5', label: 'Rel_5' },
    { from: '1', to: '4', label: 'Rel_6' },
    { from: '5', to: '3', label: 'Rel_7' }
  ]);

  const [pseudoCypher, setPseudoCypher] = useState([]);

  const [graph, setGraph] = useState({
    nodes: nodes,
    edges: edges
  });
  // console.log("graph", graph);
  // console.log({ nodes, edges });

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
      color: '#000000',
      smooth: {
        enabled: true,
        type: 'discrete',
        roundness: 0.5
      }
    },
    height: '500px',
    nodes: {
      // color: {
      //   border: "#000000",
      // background: "#ffffff"
      //   hover: {
      //     border: "#000000",
      //     // background: "#5151fc"
      //     background: "#ffffff"
      //   },
      //   highlight: {
      //     border: "#000000",
      //     // background: "#5151fc"
      //     background: "#ffffff"
      //   }
      // },
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
      // var { nodes, edges /*, connectedNodes*/ } = event;
      highlightConnectedNodes(event, event.node);
      // console.log(graph.getConnectedNodes(event.node));
      generatePseudoCypher(event.node, true);
    },
    blurNode: function(event) {
      generatePseudoCypher('', false);
    },
    hoverEdge: function(event) {
      // highlight connected nodes
    },
    blueEdge: function(event) {
      // de-highlight connected nodes
    }
  };

  function highlightConnectedNodes(e, key) {
    // console.log("Node id hovered: ", key);
    // var node = graph.nodes.find(n => n.id === key);
    var node = nodes.find(n => n.id === key);
    // console.log("node", node);
    var array = [key];

    //TODO add other nodes from edges to 'array'

    var updated = graph.nodes;
    // console.log("updated nodes", key, updated);

    for (var i = 0; i < updated.length; i++) {
      for (var j = 0; j < array.length; j++) {
        // console.log(updated[i].id, array[j]);
        if (updated[i].id !== array[j]) {
          // console.log("before", updated[i].id, updated[i].color);
          updated[i].color = {
            background: '#5151fc'
          };
          // console.log("after", updated[i].id, updated[i].color);
          // updated[i].hover = true;
        }
      }
    }

    // console.log("nodes", nodes, "updated", updated);

    setNodes([...updated]);
    // console.log("nodes updates");
  }

  // console.log("nodes", nodes);

  function generatePseudoCypher(key, generate) {
    if (generate === true) {
      var rels = edges.filter(r => r.from === key || r.to === key);

      var updated = [];

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
        updated.push(
          '(:' +
            start.label +
            ')-[:' +
            rels[i].label +
            ']->(:' +
            end.label +
            ')'
        );
      }

      setPseudoCypher([...updated]);
    } else {
      setPseudoCypher([]);
    }
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      {/*<Grid item xs={12}>
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
            </Grid>*/}

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Graph
            // graph={graph}
            graph={{ nodes: nodes, edges: edges }}
            options={options}
            events={events}
            getNetwork={network => {
              //  if you want access to vis.js network api you can set the state in a parent component using this property
              //console.log(network);
              //console.log(network.body.nodes);
            }}
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <p>Hover or select node to generate pseudo cypher</p>
          {pseudoCypher.map((cypher, index) => {
            return <p key={index}>{cypher}</p>;
          })}
        </Paper>
      </Grid>
    </Grid>
  );
}
