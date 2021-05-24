import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { useLogin } from './contexts/LoginContext';
import Explore from './screens/Explore/Explore';
import LandingPage from './screens/landingPage/LandingPage';
import NavBar from './screens/NavBar/NavBar';
import Profile from './screens/Profile/Profile';
import Toast from './screens/components/Toast';
import { useState } from 'react';

function App() {
  const history = useHistory();
  const { login, setLogin, setToken, setUser } = useLogin();
  const [showAlert, setShowAlert] = useState(false);

  const responseFacebook = async ({ id, name }) => {
    if (id && name) {
      const registerPayload = {
        facebookId: id,
        name: name,
      };

      try {
        const { data } = await axios.post('/v1/auth/login', registerPayload);
        setToken(data.tokens.access.token);
        setUser(data.user);
        setLogin(true);
        history.push('/home');
      } catch {
        setShowAlert(true);
      }
    }
  };

  return (
    <div className="backgroundLayout">
      <Toast message="Failed to login" showAlert={showAlert} onClose={() => setShowAlert((p) => !p)} severity="error" />
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
    </div>
  );
}

export default App;
