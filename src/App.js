import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';

import Home from "./views/Home";
import NearEarth from "./views/NearEarth";

import "./scss/app.scss";

const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    }
});

const App = ({ classes }) => (
    <Router>
        <div className={classes.layout}>
            <Route path="/" exact component={Home} />
            <Route path="/near-earth" exact component={NearEarth} />
        </div>
    </Router>
)

export default withStyles(styles)(App);