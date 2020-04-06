import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

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

export default function Buttons() {
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
      id: "n1",
      linked: ["n2", "n5"],
      groups: ["L1"],
      x: 100,
      y: 100,
      r: 10,
      opacity: 0.5
    },
    {
      id: "n2",
      linked: ["n1", "n3", "n4"],
      groups: ["L1", "L2"],
      x: 150,
      y: 100,
      r: 10,
      opacity: 0.5
    },
    {
      id: "n3",
      linked: ["n2", "n4"],
      groups: ["L2"],
      x: 200,
      y: 100,
      r: 10,
      opacity: 0.5
    },
    {
      id: "n4",
      linked: ["n2", "n3"],
      groups: ["L3"],
      x: 150,
      y: 150,
      r: 10,
      opacity: 0.5
    },
    {
      id: "n5",
      linked: ["n1"],
      groups: [],
      x: 100,
      y: 200,
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
  // console.log(leftButtons);

  function increaseOpacity(e, key) {
    var array = connected[key].linked;

    var updates = array.reduce((thing, item) => {
      thing[item] = 1.0;
      return thing;
    }, {});

    updates[key] = 1.0;

    setOpacity({ ...opacity, ...updates });
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
    </Grid>
  );
}
