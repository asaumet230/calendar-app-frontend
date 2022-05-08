import React from 'react';

const NavBar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
        <span className="navbar-brand">
                Andres Felipe Saumet
        </span>

        <button className="btn btn-outline-danger">
          <i className="fa-solid fa-right-from-bracket"></i>
          <span> Salir</span>
        </button>
    </div>
  )
}

export default NavBar;