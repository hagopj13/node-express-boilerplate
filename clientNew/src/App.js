import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { useLogin } from './contexts/LoginContext';
import Explore from './screens/Explore/Explore';
import LandingPage from './screens/landingPage/LandingPage';
import NavBar from './screens/NavBar/NavBar';
import Profile from './screens/Profile/Profile';

function App() {
  const history = useHistory();
  const [login, setLogin] = useLogin();

  const responseFacebook = (response) => {
    let { id, name } = response;
    if (id && name) {
      let registerPayload = {
        "facebookId": id,
        "name": name
      };
      axios.post("/v1/auth/login", registerPayload)
        .then((response) => {
          // if we get response, it means we got the tokens and we got the user object
          // SAVE TOKEN
          // SAVE USER OBJECT
          console.log(response);
          let backendToken = response.data.tokens.access.token;
          let user = response.data.user;
          console.log(backendToken);
          console.log(user);

          setLogin(true);
          history.push('/home');
        })
        .catch((error) => {
          // WE NEED A WAY TO SHOW ERROR
          console.log(error);
          alert("Login failed. Check console");
        });
    }
  };

  return (
    <>
      {!login && (
        <div className="facebookLogin">
          <FacebookLogin appId="368528274469848" fields="name,email,picture" callback={responseFacebook} />
        </div>
      )}

      {login && (
        <div className="screenHeight">
          <NavBar />
          <Switch>
            <Route exact path="/home" component={LandingPage} />
            <Route exact path="/explore" component={Explore} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
      )}
    </>
  );
}

export default App;
