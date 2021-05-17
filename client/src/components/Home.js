import React from "react";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {
    Link as RouterLink
} from "react-router-dom";
import { useSelector } from 'react-redux';
import {
    selectIsLoggedInFlag,
} from '../features/token/tokenSlice';

export default function Home() {
    const isLoggedIn = useSelector(selectIsLoggedInFlag);
    if (isLoggedIn) {
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
    else {
        return null;
    }
}