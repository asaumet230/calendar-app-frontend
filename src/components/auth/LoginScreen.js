import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


// Custom Hooks:
import useForm from '../../hooks/useForm';

// CSS:
import './login.css';

// Actions:
import { startLogin, startRegister }  from '../../actions/auth';

// Helpers:
import { registerFormValid } from '../../helpers/registerFormValid';
import { loginFormValid } from '../../helpers/loginFormValid';

const LoginScreen = () => {
    
    const dispatch = useDispatch();
    const [ error, setError ] = useState( false );
    const [ erroMessage, setErrorMessage ] = useState( '' );

    const [ formLoginValues, handleInputChanges, reset ] = useForm({
        loginEmail: '',
        loginpassword: ''
    });

    const [ formRegisterValues, handleInputRegisterChanges, registerReset ] = useForm({
        registerName: '',
        registerEmail: '',
        registerPassword: '',
        registerPassword2: ''
    });
  
    const { loginEmail, loginpassword } = formLoginValues;
    const { registerName, registerEmail, registerPassword, registerPassword2 } = formRegisterValues;


    const handleLogin = (e) => {

        e.preventDefault();
       

        if( loginFormValid( 
                loginEmail, 
                loginpassword, 
                setError, 
                setErrorMessage )) {

           

            dispatch( startLogin( loginEmail, loginpassword ) );
        }

        reset();

    }

    const hanldeRegister = (e) => {

        e.preventDefault();

        if( registerFormValid(
                registerName, 
                registerEmail, 
                registerPassword, 
                registerPassword2, 
                setError, 
                setErrorMessage ) ) {

            dispatch( startRegister( registerName, registerEmail, registerPassword ));
        }

        registerReset();
    }


    return (
        <div className="container login-container">
        <div className="row">

            <div className="col-md-6 login-form-1">
            <h3>Ingreso</h3>
            <form onSubmit={ handleLogin } >
                <div className="form-group">
                    <input 
                        type="email"
                        className="form-control"
                        placeholder="Correo"
                        name='loginEmail'
                        value={ loginEmail }
                        onChange={ handleInputChanges }
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        name='loginpassword'
                        value={ loginpassword }
                        onChange={ handleInputChanges }
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="submit"
                        className="btnSubmit"
                        value="Login" 
                    />
                </div>

                { error&& <div className="alert alert-danger text-center"> { erroMessage } </div> }
            </form>
            </div>

            <div className="col-md-6 login-form-2">
            <h3>Registro</h3>
            <form onSubmit={ hanldeRegister }>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        name='registerName'
                        value={ registerName }
                        onChange={ handleInputRegisterChanges }
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Correo"
                        name='registerEmail'
                        value={ registerEmail }
                        onChange={ handleInputRegisterChanges }
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        name='registerPassword'
                        value={ registerPassword }
                        onChange={ handleInputRegisterChanges }
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Repita la contraseña"
                        name='registerPassword2'
                        value={ registerPassword2 } 
                        onChange={ handleInputRegisterChanges }
                    />
                </div>

                <div className="form-group">
                    <input 
                        type="submit" 
                        className="btnSubmit" 
                        value="Crear cuenta" />
                </div>

                { error&& <div className="alert alert-danger text-center"> { erroMessage } </div> }
            </form>
            </div>

        </div>
        </div>
    )
}

export default LoginScreen;