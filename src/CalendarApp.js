import React from 'react'
import { Provider } from 'react-redux';

// Store:
import store from './store/store';

// Router;
import AppRouter from './router/AppRouter';

const CalendarApp = () => {
  return (

    <div>
      <Provider store={ store }>
        <AppRouter />
      </Provider>
    </div>
  )

}

export default CalendarApp;