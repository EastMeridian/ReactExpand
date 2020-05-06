import React, { useState, useEffect } from 'react';
import {
  View,
} from 'react-game-map';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import {
  createCookie,
  getCookie,
} from '../utils/cookies';

const containerStyle = {
  height: '100vh',
  width: '100vw',
  alignItems: 'center',
  justifyContent: 'center',
};

const layoutStyle = {

};

const logIn = async (history) => {
  history.push("/map");
};

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const history = useHistory()

  const handleChange = (e) => {
    setUsername(e.target.value);
  }

  const handleConnect = () => {
    createCookie('username', username);
    logIn(history);
  };

  useEffect(() => {
    const usernameCookie = getCookie('username');
    console.log('usernameCookie', usernameCookie);

    if (usernameCookie && history) {
      logIn(history);
    }
  }, [history, username]);

  return (
    <View style={containerStyle}>
      <View style={layoutStyle}>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={handleChange}
        />
        <Button
          style={{ marginTop: '2em' }}
          disabled={username === ''}
          onClick={handleConnect}
        >
          connect
        </Button>
      </View>
    </View>
  );
}
export default LoginScreen;
