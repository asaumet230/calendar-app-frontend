import validator from 'validator';


 export const loginFormValid = ( 
        loginEmail, 
        loginPassword, 
        setError, 
        setErrorMessage ) => {
    
        if( !validator.isEmail(loginEmail) ) {

            setError( true );
            setErrorMessage( 'El email es inválido' );
            return false;

        } else if ( loginPassword.length < 5 ) {

            setError( true );
            setErrorMessage( 'Las contraseñas no coinciden o son inválidas' );
            return false;

        } else {
            setError( false );
            setErrorMessage( '' );
            return true;
        }
    }
