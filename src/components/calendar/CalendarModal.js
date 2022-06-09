import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';

// Actions:
import { uiCloseModal } from '../../actions/ui';
import { eventActiveClear, eventStartAddNew , eventStartUpdated } from '../../actions/events';

//Css:
import './modal.css';

const customStyles = {
  content: {
    top:            '50%',
    left:           '50%',
    right:          'auto',
    bottom:         'auto',
    marginRight:    '-50%',
    transform:      'translate(-50%, -50%)',
  },
};

if( process.env.NODE_ENV !== 'test' ) { 
    Modal.setAppElement('#root');
}

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const endDate = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: endDate.toDate()
};


const CalendarModal = () => {
    
    const { openModal } = useSelector( state => state.ui );
    const { activeEvent } = useSelector( state => state.calendar );
    const dispatch = useDispatch();

    const [ dateStart, setDateStart ] = useState( now.toDate() );
    const [ dateEnd, setDateEnd ] = useState( endDate.toDate() );
    const [ titleValid, setTitleValid ] = useState(true);


    // Form Values:
    const [ formValues, setFormValues ] = useState( initEvent );
    const  { title, notes, start, end } = formValues;

    useEffect(() => {
      
        if( activeEvent ) {
            setFormValues( activeEvent );
        } else {
            setFormValues( initEvent );
        }
        
    }, [ activeEvent ]);
    

    const handleInputChange = ({ target }) => {

        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const closeModal = () => { 
        dispatch( uiCloseModal() );
        dispatch( eventActiveClear() );
        setFormValues( initEvent );
    }

    const handleStartDateChange = (e) => { 

        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        });
    }

    const handleEndDateChange = (e) => {

        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        });
    }

    // Submit Form:
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const momentStart = moment( start );
        const momentEnd = moment( end );
      
        if( momentStart.isSameOrAfter( momentEnd, 'hour' ) ) {

           return Swal.fire({
                title: 'Error!',
                text: 'Start date is after end date',
                icon: 'error',
                confirmButtonText: 'Cool'
            });
        }

        if( title.trim().length < 2  ) {
            return setTitleValid(false);
        }


        if( activeEvent ) {

            dispatch( eventStartUpdated( formValues ) );

        } else {
    
            dispatch( eventStartAddNew( formValues ));
        }

        setTitleValid(true);
        closeModal();
    }

    return (

        <Modal
            isOpen={ openModal }
            onRequestClose={ closeModal }
            style={ customStyles }
            closeTimeoutMS={ 200 }
            className="modal"
            overlayClassName="modal-fondo"
            ariaHideApp = { !process.env.NODE_ENV === 'test' }
        >
            <h2> { activeEvent ? 'Editar Evento' : 'Nuevo Evento'  } </h2>
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmit }>

                <div className="form-group">

                    <label>Fecha y hora inicio</label>

                    <DateTimePicker 
                        onChange={ handleStartDateChange } 
                        value={ dateStart }
                        className="form-control" />

                </div>

                <div className="form-group">

                    <label>Fecha y hora fin</label>

                    <DateTimePicker 
                        onChange={ handleEndDateChange } 
                        value={ dateEnd }
                        className="form-control" />
                   
                </div>

                <hr />

                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={ `form-control ${ !titleValid && 'is-invalid' }` }
                        placeholder="Título del evento"
                        name="title"
                        value = { title }
                        onChange= { handleInputChange }
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value = { notes }
                        onChange= { handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}

export default CalendarModal;