import React from "react";
import {Container,AppBar,Typography,Grow,Grid} from "@material-ui/core"
import Posts from "./components/Posts/Posts";
import Form from "./components/From/Form";
import useStyles from "./styles";

function App() {
  let classes=useStyles()
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} align="center" variant="h2">
          Memories
          <img className={classes.image} src="http://bit.ly/memories_image" alt="memories" height="60"></img>
        </Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={4}>
            <Grid item xs={12} sm={7}>
                <Posts/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Form/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
