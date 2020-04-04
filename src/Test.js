import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
// import * as d3 from "d3";
import Konva from "konva";
import { Stage, Layer, Rect, Text, Circle, Line } from "react-konva";

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

export default function Test() {
  const classes = useStyles();

  const [opacity, setOpacity] = useState({
    "1a": 0.5,
    "1b": 0.5,
    "2a": 0.5,
    "2b": 0.5
  });

  const connected = {
    "1a": {
      linked: ["1b", "2a"]
    },
    "1b": {
      linked: ["1a", "2b"]
    },
    "2a": {
      linked: ["1a", "2b"]
    },
    "2b": {
      linked: ["1b", "2a"]
    }
  };

  const [nodes, setNodes] = useState([
    {
      linked: ["n2", "n3", "n5"],
      id: "n1",
      x: 100,
      y: 100,
      r: 10,
      opacity: 0.5
    },
    {
      linked: ["n1", "n3", "n4"],
      id: "n2",
      x: 150,
      y: 100,
      r: 10,
      opacity: 0.5
    },
    {
      linked: ["n1", "n2", "n4"],
      id: "n3",
      x: 200,
      y: 100,
      r: 10,
      opacity: 0.5
    },
    {
      linked: ["n2", "n3"],
      id: "n4",
      x: 150,
      y: 150,
      r: 10,
      opacity: 0.5
    },
    {
      linked: ["n1"],
      id: "n5",
      x: 100,
      y: 200,
      r: 10,
      opacity: 0.5
    }
  ]);

  function increaseOpacity(e, key) {
    var array = connected[key].linked;

    var updates = array.reduce((thing, item) => {
      thing[item] = 1.0;
      return thing;
    }, {});

    updates[key] = 1.0;

    setOpacity({ ...opacity, ...updates });
  }

  function increaseOpacity2(e, key) {
    var node = nodes.find(n => n.id === key);
    var array = node.linked;
    array.push(key);

    var updated = nodes;

    for (var i = 0; i < updated.length; i++) {
      for (var j = 0; j < array.length; j++) {
        if (updated[i].id === array[j]) {
          updated[i].opacity = 1.0;
        }
      }
    }

    setNodes([...updated]);
  }

  const decreaseOpacity = e => {
    // e.target.style.opacity = 1.0;
    // console.log("unhover");
    setOpacity({
      "1a": 0.5,
      "1b": 0.5,
      "2a": 0.5,
      "2b": 0.5
    });

    var updated = nodes;
    for (var i = 0; i < updated.length; i++) {
      updated[i].opacity = 0.5;
    }
    setNodes([...updated]);
    // console.log(opacity);
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <Paper className={classes.paper}>
              <Button
                key="1a"
                //opacity={opacity["1a"]}
                style={{ opacity: opacity["1a"] }}
                onMouseEnter={e => increaseOpacity(e, "1a")}
                onMouseLeave={e => decreaseOpacity(e)}
              >
                Button 1a
              </Button>
              <Button
                key="1b"
                style={{ opacity: opacity["1b"] }}
                onMouseEnter={e => increaseOpacity(e, "1b")}
                onMouseLeave={e => decreaseOpacity(e)}
              >
                Button 1b
              </Button>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Button
                key="2a"
                style={{ opacity: opacity["2a"] }}
                onMouseEnter={e => increaseOpacity(e, "2a")}
                onMouseLeave={e => decreaseOpacity(e)}
              >
                Button 2a
              </Button>
              <Button
                key="2b"
                style={{ opacity: opacity["2b"] }}
                onMouseEnter={e => increaseOpacity(e, "2b")}
                onMouseLeave={e => decreaseOpacity(e)}
              >
                Button 2b
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <Paper className={classes.paper}>
              {/* <Stage width={window.innerWidth} height={window.innerHeight}> */}
              <Stage width={500} height={500}>
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
                        onMouseEnter={e => increaseOpacity2(e, n.id)}
                        onMouseLeave={e => decreaseOpacity(e)}
                      />
                    );
                  })}
                </Layer>
                <Layer>
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
                        onMouseEnter={e => increaseOpacity2(e, n.id)}
                        onMouseLeave={e => decreaseOpacity(e)}
                      />
                    );
                  })}
                </Layer>
              </Stage>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              {/* <Stage width={window.innerWidth} height={window.innerHeight}> */}
              <Stage width={500} height={500}>
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
                        onMouseEnter={e => increaseOpacity2(e, n.id)}
                        onMouseLeave={e => decreaseOpacity(e)}
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
