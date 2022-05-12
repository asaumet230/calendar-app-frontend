import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';

// Components:
import NavBar from '../../components/ui/NavBar';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';

// Actions: 
import { uiOpenModal } from '../../actions/ui';

// Styles Big Calendar:
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Helpers:
import { messages } from '../../helpers/calendar-messages-es';

moment.locale('es');

const localizer = momentLocalizer(moment);

const events = [{
  title: 'Dia de las madres',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  bgcolor: '#fafafa',
  user : {
    _id: '123',
    name: 'Juan',
  }
}];


const CalendarScreen = () => {


  const dispatch = useDispatch();

  const [ lastView, setlastView ] = useState( localStorage.getItem('lastView') || 'month' );


  const onDobleClick = (e) => {
    
    dispatch( uiOpenModal() );
  }

  const onSelectEvent = (e) => {
    console.log(e);
  }

  const onViewChanged = (e) => { 
    setlastView(e);
    localStorage.setItem('lastView', e)
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: '#fff',
    }

    return {
      style,
    }
  };

  return (

    <div className="calendar-screen">

      <NavBar />
        
      
      <Calendar
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        messages={ messages }
        onDoubleClickEvent={ onDobleClick }
        onSelectEvent={ onSelectEvent }
        eventPropGetter={ eventStyleGetter }
        onView={ onViewChanged }
        view={ lastView }
        components = {{
          event: CalendarEvent,
        }}
      />

      <CalendarModal />
      
    </div>
  )
}

export default CalendarScreen;