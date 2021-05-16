import React from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link as RouterLink
  } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {
    setIsLoggedInFlag, setFacebookToken, setBackendToken,
    selectIsLoggedInFlag, selectFacebookToken, selectBackendToken,
  } from '../features/token/tokenSlice';

export default function Home() {
    const isLoggedIn = useSelector(selectIsLoggedInFlag);
    if(isLoggedIn){
        return (
            <Container>
                <Button variant="contained" color="primary" component={RouterLink} to="/explore">
                    EXPLORE
                </Button>
                <Button variant="contained" color="primary" component={RouterLink} to="/profile">
                    PROFILE
                </Button>
            </Container>
        );
    }
    else{
        return (
            <Container>
                <Button variant="contained" color="primary"component={RouterLink} to="/register">
                    REGISTER
                </Button>
                <Button variant="contained" color="primary"component={RouterLink} to="/login">
                    LOGIN
                </Button>
            </Container>
        );
    }
}