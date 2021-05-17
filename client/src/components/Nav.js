import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link as RouterLink
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


export default function Nav() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            InstaBid
                        </Typography>
                        <Button color="inherit" component={RouterLink} to="/">HOME</Button>
                        <Button color="inherit" component={RouterLink} to="/login">LOGIN</Button>
                        <Button color="inherit" component={RouterLink} to="/logout">LOGOUT</Button>
                        <Button color="inherit" component={RouterLink} to="/register">REGISTER</Button>
                    </Toolbar>
                </AppBar>
            </div>
        </div>

    );
}