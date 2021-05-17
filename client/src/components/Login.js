import React, { useState } from "react";
import axios from 'axios';
import { Redirect, useHistory, Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import {
  setIsLoggedInFlag, setFacebookToken, setBackendToken,
  selectIsLoggedInFlag, selectFacebookToken, selectBackendToken,
} from '../features/token/tokenSlice';
import {
  setFacebookId, setId, setName, setAddress,
} from '../features/user/userSlice';
import {
  setData,
} from '../features/resource/resourceSlice';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

export default function Login() {
  let history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedInFlag);
  const backendToken = useSelector(selectBackendToken);

  const [error, setError] = useState('');

  let login = async function () {
    if (isLoggedIn)
      return;
    // first invoke fb login
    // once you do that, you will get facebookId and facebookToken
    // we should store them in global state

    // here we will access global state to get that data
    // create a post request to backend
    const payload = {
      "facebookId": "<InsertFBId>",
      "facebookToken": "<InsertToken>"
    };
    try {
      const response = await axios.post('/v1/auth/login', payload);
      console.log(response);
      if (response.status === 200) {
        // set tokens
        dispatch(setIsLoggedInFlag());
        dispatch(setBackendToken(response.data.tokens.access.token));
        // set resouces
        dispatch(setData(response.data.user.resource));
        // set user data
        dispatch(setFacebookId(response.data.user.facebookId));
        dispatch(setId(response.data.user.id));
        dispatch(setName(response.data.user.name));
        dispatch(setAddress(response.data.user.blockchainData.data.address));

        //history.push('/');
      }
      else {
        setError("login failed. Please try again");
      }
    } catch (error) {
      setError("login failed. Please try again");
    }
  };

  if (isLoggedIn) {
    return (
      <Container style={{ justifyContent: 'center' }}>
        <h2>Login successful</h2>
        <Button variant="contained" color="primary" component={RouterLink} to="/">
          Click here to go to home
        </Button>
      </Container>
    );
  }
  else {
    return (
      <Container style={{ justifyContent: 'center' }}>
        <p>{error}</p>
        <Button variant="contained" color="primary" onClick={login}>
          LOGIN WITH FB
        </Button>
      </Container>
    );
  }
}