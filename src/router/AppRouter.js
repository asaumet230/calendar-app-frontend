import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Components:
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';

function AppRouter() {
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