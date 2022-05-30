import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


// Actions:
import { startCheking } from '../actions/auth';

// Components:
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';

const AppRouter= () => {

  const dispatch = useDispatch();

  useEffect( ()=> {

    dispatch( startCheking() );

  }, [ dispatch ] );

  return (
    <Router>
      <div>
        <Switch>

          <Route exact path='/login' component={ LoginScreen } />
          <Route exact path='/' component={ CalendarScreen } />
          <Redirect to='/'/>

        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter