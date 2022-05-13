import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';

// Components:
import NavBar from '../../components/ui/NavBar';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';

// Actions: 
import { uiOpenModal } from '../../actions/ui';
import { eventActiveClear, eventSetActive } from '../../actions/events';

// Styles Big Calendar:
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Helpers:
import { messages } from '../../helpers/calendar-messages-es';

moment.locale('es');
const localizer = momentLocalizer(moment);



const CalendarScreen = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar );

  const [ lastView, setlastView ] = useState( localStorage.getItem('lastView') || 'month' );


  const onDobleClick = (e) => {
    dispatch( uiOpenModal() );
  }

  const onSelectEvent = (e) => {
    dispatch( eventSetActive(e) );
    
  }

  const onViewChanged = (e) => { 
    setlastView(e);
    localStorage.setItem('lastView', e)
  }

  const onSelectSlot = (e) => { 
    dispatch( eventActiveClear() );
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
        onSelectSlot = { onSelectSlot }
        selectable = { true }
        onView={ onViewChanged }
        view={ lastView }
        components = {{
          event: CalendarEvent,
        }}
      />

      <AddNewFab />

      { activeEvent && <DeleteEventFab /> }
      
      <CalendarModal />
      
    </div>
  )
}

export default CalendarScreen;