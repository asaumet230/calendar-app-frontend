import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';


// Actions:
import { startCheking } from '../actions/auth';

// Components:
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const AppRouter= () => {

  const dispatch = useDispatch();
  const { checking, uid } = useSelector( state => state.auth );

  useEffect( () => {

    dispatch( startCheking() );
    
   
  }, [ dispatch ] );

  if ( checking ) return <h4>Loading...</h4>;

  return (
    <Router>
      <div>
        <Switch>

          <PublicRoutes 
            exact path='/login' 
            component={ LoginScreen }
            isAuthenticated= { !!uid }  />

          <PrivateRoutes 
            exact path='/' 
            component={ CalendarScreen }
            isAuthenticated= { !!uid } />


          <Redirect to='/login'/>

        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter