import { useState } from "react";

const useForm = ( initialState = {} ) => {

    const [ values, setValues ] = useState(initialState);

    // Agregar Valores al Formulario:
    const handleInputChanges = ( { target } ) => {

        setValues({
            ...values,
            [ target.name ]: target.value
        });
    }

    // Resetear Valores del Formulario;
    const reset = ()=> {

        setValues(initialState);

    }

    return [ values, handleInputChanges, reset ];
}

export default useForm;