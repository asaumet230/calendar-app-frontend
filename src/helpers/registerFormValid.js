import validator from 'validator';


 export const registerFormValid = ( 
        registerName, 
        registerEmail, 
        registerPassword, 
        registerPassword2, 
        setError, 
        setErrorMessage ) => {
    
        if( registerName.trim().length === 0 ) {
    
            setError( true );
            setErrorMessage( 'El nombre es requerido' );
            return false;

        } else if( !validator.isEmail(registerEmail) ) {

            setError( true );
            setErrorMessage( 'El email es inválido' );
            return false;

        } else if ( registerPassword !== registerPassword2 || registerPassword.length < 5 ) {

            setError( true );
            setErrorMessage( 'Las contraseñas no coinciden o son inválidas' );
            return false;

        } else {
            setError( false );
            setErrorMessage( '' );
            return true;
        }
    }

    