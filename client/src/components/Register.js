import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  setIsLoggedInFlag, setFacebookToken, setBackendToken,
  selectIsLoggedInFlag, selectFacebookToken, selectBackendToken,
} from '../features/token/tokenSlice';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

export default function Register() {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedInFlag);
  const [error, setError] = useState('');

  let register = async function () {
    if (isLoggedIn)
      return;
    // first invoke fb login => you will go through a bunch of fb stuff and we will get some data
    // like fb id, token, etc

    // here we will access global state to get that data
    // create a post request to backend
    const payload = {
      "facebookId": "102",
      "name": "Devanshu Devanshu"
    };
    try {
      const response = await axios.post('/v1/auth/register', payload);
      console.log(response);
      if (response.status === 200) {
        // set token and id and whatever you get
        dispatch(setFacebookToken());
      }
      else {
        setError("Register failed. Please try again");
      }
    } catch (error) {
      setError("login failed. Please try again");
    }
  };


  if (isLoggedIn) {
    return (
      <Container>
        <h2>You are logged in</h2>
        <h2>Click on HOME</h2>
      </Container>
    );
  }
  else {
    return (
      <Container>
        <p>{error}</p>
        <Button variant="contained" color="primary" onClick={register}>
          REGISTER WITH FB
        </Button>
      </Container>
    );
  }
}