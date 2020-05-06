import React from 'react';
import MapScreen from './screens/MapScreen';
import LoginScreen from './screens/LoginScreen';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import {
  getCookie,
} from './utils/cookies';

import { Provider } from 'react-redux'
import configureStore from './redux/configureStore';

const store = configureStore();

store.dispatch({ type: 'TEST' });
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        getCookie('username') ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginScreen />
          </Route>
          <PrivateRoute path="/map">
            <MapScreen />
          </PrivateRoute>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
