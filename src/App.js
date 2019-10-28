import React, {Suspense} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import Home from './containers/Home';
import Dashboard from './containers/Dashboard';
import Loading from './components/Loading/Loading';
import './style.scss';

function App() {

  return (
    <div>
      <Suspense fallback={<Loading/>}>
        <Switch>
          <Route path="/board" component={Dashboard} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
