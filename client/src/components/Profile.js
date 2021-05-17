import React from "react";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  setIsLoggedInFlag, setFacebookToken, setBackendToken,
  selectIsLoggedInFlag, selectFacebookToken, selectBackendToken,
} from '../features/token/tokenSlice';
import {
  setFacebookId, setId, setName, setAddress,
  selectFacebookId, selectId, selectName, selectAddress
} from '../features/user/userSlice';
import {
  setData,
  selectData
} from '../features/resource/resourceSlice';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import getImages from './images';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Profile() {
  // styling
  const classes = useStyles();

  // redux store fetch
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedInFlag);
  const name = useSelector(selectName);
  const address = useSelector(selectAddress);
  const resourceData = useSelector(selectData);
  console.log(resourceData);
  const userId = useSelector(selectId);
  const backendToken = useSelector(selectBackendToken);


  const importImagesFromInstagram = async function () {
    let fetchedImages = getImages();
    console.log(fetchedImages);

    // lets post this into backend
    // localhost:{{PORT}}/v1/users/{{userId}}/addResource
    // payload is just an array
    const payload = fetchedImages;
    const config = {
      headers: { Authorization: `Bearer ${backendToken}` }
    };
    const response = await axios.post('/v1/users/' + userId + '/addResource', payload, config);
    if (response.status === 202) {
      // then we updated the data, so lets set that into the global store
      // set resouces
      console.log(response);
      dispatch(setData(response.data.resource));
    }
  };

  if (isLoggedIn) {
    return (
      <Container>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              <b>Name : {name}</b>
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              <b>Address : {address}</b>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <Card className={classes.root}>
          <CardActions>
            <Button variant="contained" color="primary" onClick={importImagesFromInstagram}>
              IMPORT IMAGES
            </Button>
          </CardActions>
        </Card>
        <Card>
          <CardContent>
            {resourceData.map((resource, index) => {
              return (<Typography className={classes.title} color="textSecondary" gutterBottom key={index}>
                {resource.resourceUrl} : {resource.state}
              </Typography>)
            })}

          </CardContent>
        </Card>
      </Container >
    );
  }
  else {
    return (
      <Container>
        <h2>You are not logged in. Please login.</h2>
      </Container>
    );
  }

}