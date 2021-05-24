import FacebookLogin from 'react-facebook-login';
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

  const responseFacebook = ({ email }) => {
    if (email) {
      setLogin(true);
      history.push('/home');
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
