import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
// import * as d3 from "d3";
//import Konva from "konva";
import {
  Stage,
  Layer,
  /*Rect, */ Text,
  Circle,
  Line /*, Node*/
} from 'react-konva';
// import { Solarize } from 'konva/types/filters/Solarize';

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

export default function SimpleNodes() {
  const classes = useStyles();

  const [nodes, setNodes] = useState([
    {
      id: 'n1',
      linked: ['n2', 'n5'],
      linked2: ['n1_2'],
      groups: ['L1'],
      x: 100,
      y: 100,
      r: 10,
      opacity: 0.5
    },
    {
      id: 'n2',
      linked: ['n1', 'n3', 'n4'],
      linked2: ['n1_2'],
      groups: ['L1', 'L2'],
      x: 150,
      y: 100,
      r: 10,
      opacity: 0.5
    },
    {
      id: 'n3',
      linked: ['n2', 'n4'],
      linked2: ['n1_2'],
      groups: ['L2'],
      x: 200,
      y: 100,
      r: 10,
      opacity: 0.5
    },
    {
      id: 'n4',
      linked: ['n2', 'n3'],
      linked2: ['n2_2'],
      groups: ['L3'],
      x: 150,
      y: 150,
      r: 10,
      opacity: 0.5
    },
    {
      id: 'n5',
      linked: ['n1'],
      linked2: ['n2_2'],
      groups: [],
      x: 100,
      y: 200,
      r: 10,
      opacity: 0.5
    }
  ]);

  const [nodes2, setNodes2] = useState([
    {
      id: 'n1_2',
      linked: ['n2_2'],
      linked2: ['n1'],
      groups: ['L1'],
      x: 100,
      y: 100,
      r: 10,
      opacity: 0.5
    },
    {
      id: 'n2_2',
      linked: ['n1_2'],
      linked2: ['n1','n5'],
      groups: ['L1', 'L2'],
      x: 150,
      y: 100,
      r: 10,
      opacity: 0.5
    }
  ]);

  const leftButtons = nodes
    .map(n => n.groups.map(g => g))
    .flat()
    .sort()
    .reduce((unique, item) => {
      return unique.includes(item) ? unique : [...unique, item];
    }, []);
  
  function increaseOpacity(e, key, nodesArray, arrayIndicator) {
    var node = nodesArray.find(n => n.id === key);
    if (node !== undefined) {
      var array = node.linked;
      array.push(key);

      var updated = nodesArray;

      for (var i = 0; i < updated.length; i++) {
        for (var j = 0; j < array.length; j++) {
          if (updated[i].id === array[j]) {
            updated[i].opacity = 1.0;
          }
        }
      }

      if (arrayIndicator === '1') {
        setNodes([...updated]);
      }
      if (arrayIndicator === '2') {
        setNodes2([...updated]);
      }
    }
  }

  function increaseOpacityOther(e,keys,nodesArray,arrayIndicator){
    // this currently seems expensive iterating over "setnodes/2" too many times. could be/ should be refactored
    var nodes = [];
    for (var h=0;h<keys.length;h++){
      // increaseOpacity(e,keys[i],nodesArray,arrayIndicator)
      var node = nodesArray.find(n => n.id === keys[h]);
      if (node !== undefined) {
        var array = node.linked2;
        array.push(keys[h]);

        var updated = nodesArray;

        for (var i = 0; i < updated.length; i++) {
          for (var j = 0; j < array.length; j++) {
            if (updated[i].id === array[j]) {
              updated[i].opacity = 1.0;
            }
          }
        }
  
        if (arrayIndicator === '1') {
          setNodes([...updated]);
        }
        if (arrayIndicator === '2') {
          setNodes2([...updated]);
        }     
      }
    }
  }

  function decreaseOpacity(e, nodesArray, arrayIndicator) {
    // setOpacity({
    //   '1a': 0.5,
    //   '1b': 0.5,
    //   '2a': 0.5,
    //   '2b': 0.5
    // });

    var updated = nodesArray;
    for (var i = 0; i < updated.length; i++) {
      updated[i].opacity = 0.5;
    }
    if (arrayIndicator === '1') {
      setNodes([...updated]);
    }
    if (arrayIndicator === '2') {
      setNodes2([...updated]);
    }
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      {/*<Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <Paper className={classes.paper}>
              {leftButtons.map(b => {
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
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <Paper className={classes.paper}>
              {/* <Stage width={window.innerWidth} height={window.innerHeight}> */}
              <Stage width={250} height={250}>
                <Layer>
                  {nodes.map(n => {
                    return (
                      <Circle
                        x={n.x}
                        y={n.y}
                        radius={n.r}
                        key={n.id}
                        opacity={n.opacity}
                        fill="green"
                        onMouseEnter={e => {
                          increaseOpacity(e, n.id, nodes, '1')
                          increaseOpacityOther(e, n.linked2, nodes2, '2')
                        }
                        }
                        onMouseLeave={e => {
                          decreaseOpacity(e, nodes, '1')
                          decreaseOpacity(e, nodes2, '2')
                        }
                        }
                      />
                    );
                  })}
                </Layer>
                {/* <Layer>
                  {nodes.map(n => {
                    return (
                      <Text
                        x={n.x - n.r / 2}
                        y={n.y - 2.5 * n.r}
                        text={n.id}
                        fontSize={15}
                        fill="FFFFF"
                        // radius={n.r}
                        key={n.id}
                        opacity={n.opacity}
                        // fill="green"
                        onMouseEnter={e =>
                          increaseOpacity(e, n.id, nodes, '1')
                        }
                        onMouseLeave={e => decreaseOpacity(e)}
                      />
                    );
                  })}
                </Layer> */}
              </Stage>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Stage width={250} height={250}>
                <Layer>
                  {nodes2.map(n => {
                    return (
                      <Circle
                        x={n.x}
                        y={n.y}
                        radius={n.r}
                        key={n.id}
                        opacity={n.opacity}
                        fill="green"
                        onMouseEnter={e => {
                          increaseOpacity(e, n.id, nodes2, '2')
                          increaseOpacityOther(e, n.linked2, nodes, '1')
                        }
                        }
                        onMouseLeave={e => {
                          decreaseOpacity(e, nodes2, '2')
                          decreaseOpacity(e, nodes, '1')
                        }}
                      />
                    );
                  })}
                </Layer>
              </Stage>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
