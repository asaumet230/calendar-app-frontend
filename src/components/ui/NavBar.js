import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions:
import { startLogout } from '../../actions/auth';


const NavBar = () => {

  const dispatch = useDispatch();
  const { name } = useSelector(state => state.auth);

  const handleLogout = () => { 

    dispatch( startLogout() );
 

  }
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
        <span className="navbar-brand">
          { name }
        </span>

        <button 
          onClick={ handleLogout }
          className="btn btn-outline-danger">
          <i className="fa-solid fa-right-from-bracket"></i>
          <span> Salir</span>
        </button>
    </div>
  )
}

export default NavBar;