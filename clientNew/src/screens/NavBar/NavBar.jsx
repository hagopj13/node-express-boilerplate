import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useLogin } from '../../contexts/LoginContext';

const NavBar = () => {
  const { setLogin } = useLogin();
  const history = useHistory();

  return (
    <AppBar position="static">
      <Toolbar style={{ backgroundColor: '#4c69ba', justifyContent: 'space-between' }}>
        <Typography style={{ cursor: 'pointer' }} onClick={() => history.push('/home')} variant="h6">
          InstaBid
        </Typography>
        <Button
          color="inherit"
          variant="outlined"
          onClick={() => {
            setLogin(false);
            history.push('/');
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
