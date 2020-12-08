import React from 'react';
import Appform from './Components/Appform';
import Login from "./Components/Login";

import {BrowserRouter, Route, Router, Switch} from 'react-router-dom';
import history from './Components/history';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
function App() {
  return (
    <BrowserRouter history={history}>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Router history={history} basename={"/resume"}>
            <Route  path={`${process.env.PUBLIC_URL}/`}  exact  name="login Page" component={Login}  />
            <Route  path={`${process.env.PUBLIC_URL}/form`}  name="sign in form" component={Appform}  />
          </Router>
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
